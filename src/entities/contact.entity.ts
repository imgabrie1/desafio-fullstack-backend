
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity"


@Entity("contacts")
class Contact {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 50 })
    name: string

    @Column({ type: "varchar", length: 50 })
    email: string

    @Column({ type: "varchar", length: 11 })
    phone: string

    @CreateDateColumn({ type: "date" })
    createdAt: Date

    @ManyToOne(() => User, (user) => user.contact)
    @JoinColumn()
    user!: User
}

export { Contact }
