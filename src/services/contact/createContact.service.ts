import { Request } from "express"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { iUserRepo } from "../../interfaces/users.interface"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { iContact, iContactRepo, iContactReturn } from "../../interfaces/contacts.interface"
import { returnContactSchema } from "../../schemas/contacts.schema"

const createContactService = async (
    contactData: iContact,
    req: Request
): Promise<iContactReturn> => {
    const userId = parseInt(req.user.id)
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: userId,
        },
    })

    if(!user) {
        throw new AppError("Usuário não encontrado")
    }

    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const contact = contactRepository.create({ ...contactData, user })
    await contactRepository.save(contact)
    const newContact = returnContactSchema.parse(contact)

    return newContact
}

export default createContactService
