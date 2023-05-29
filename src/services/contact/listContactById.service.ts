import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors"
import { iContact, iContactRepo } from "../../interfaces/contacts.interface"

const listContactByIdService = async (contactId: number, tokenId: number): Promise<iContact> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepository.findOne({
        where: {
            id: contactId,
        },
        relations: {
            user: true,
        },
    })

    if (!contact) {
        throw new AppError("Contact not found!")
    }

    if (contact.user.id !== tokenId) {
        throw new AppError("Unauthorized!", 401)
    }

    return contact
}

export default listContactByIdService
