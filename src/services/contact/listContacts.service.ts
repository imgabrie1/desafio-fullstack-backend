import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { iContact, iContactRepo } from "../../interfaces/contacts.interface";

const listAllContactService = async (): Promise<iContact[]> => {
  const contactRepository: iContactRepo = AppDataSource.getRepository(Contact);

  const contacts: iContact[] = await contactRepository
    .createQueryBuilder("contact")
    .leftJoin("contact.user", "user")
    .select(["contact.id", "contact.name", "contact.email", "contact.phone"])
    .addSelect(["user.id", "user.name", "user.email", "user.phone"])
    .getMany();

  return contacts;
};

export default listAllContactService;
