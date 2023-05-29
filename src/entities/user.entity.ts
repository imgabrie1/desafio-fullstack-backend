import { getRounds, hashSync } from "bcryptjs"
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm"
import { Contact } from "./contact.entity"

@Entity("users")
class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 50 })
    name: string

    @Column({ type: "varchar", length: 50, unique: true })
    email: string

    @Column({ type: "varchar", length: 11 })
    phone: string

    @Column({ type: "varchar", length: 120 })
    password: string

    @CreateDateColumn({ type: "date" })
    createdAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted = getRounds(this.password)
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10)
        }
    }

    @OneToMany(() => Contact, (contact) => contact.user)
    contact: Contact[]
}

export { User }
