import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { iContact, iContactRepo } from "../../interfaces/contacts.interface";

const listAllContactService = async (): Promise<iContact[]> => {
  const contactRepository: iContactRepo = AppDataSource.getRepository(Contact);
  const contacts: iContact[] = await contactRepository.find({
    relations: {
      user: true,
    },
  })

  return contacts;
}

export default listAllContactService;
