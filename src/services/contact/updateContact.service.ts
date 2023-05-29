import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { iContactRepo, iContactReturn, iContactUpdate } from "../../interfaces/contacts.interface"
import { returnContactSchema } from "../../schemas/contacts.schema"


const updateContactService = async (
    newContactData: iContactUpdate,
    idContact: number
): Promise<iContactReturn> => {
    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)
    const oldContact = await contactRepository.findOneBy({
        id: idContact,
    })

    const contact = contactRepository.create({
        ...oldContact,
        ...newContactData,
    })

    await contactRepository.save(contact)
    const updateContact = returnContactSchema.parse(contact)

    return updateContact
}

export default updateContactService
