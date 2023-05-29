import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { iContactRepo } from "../../interfaces/contacts.interface"

const deleteContactService = async (contactId: number): Promise<void> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const contact = await contactRepository.findOne({
        where: {
            id: contactId,
        },
    })

    await contactRepository.remove(contact!)
}

export default deleteContactService
