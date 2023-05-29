import { Request, Response } from "express"
import { iUser } from "../interfaces/users.interface"
import createContactService from "../services/contact/createContact.service"
import deleteContactService from "../services/contact/deleteContact.service"
import listAllContactService from "../services/contact/listContacts.service"
import listContactByIdService from "../services/contact/listContactById.service"
import { iContactUpdate } from "../interfaces/contacts.interface"
import updateContactService from "../services/contact/updateContact.service"

const createContactController = async (req: Request, res: Response) => {
    try {
        const contactData: iUser = req.body
        const newContact = await createContactService(contactData, req)

        return res.status(201).json(newContact)
    } catch (error) {
        console.log(error)
    }
}

const deleteContactController = async (req: Request, res: Response) => {
    const contactId = parseInt(req.params.id)
    await deleteContactService(contactId)

    return res.status(204).send()
}

const listContactsController = async (req: Request, res: Response) => {
    const contacts = await listAllContactService()

    return res.json(contacts)
}

const listContactByIdController = async (req: Request, res: Response) => {
    const contactId = parseInt(req.params.id)
    const tokenId = parseInt(req.user.id)
    const contact = await listContactByIdService(contactId, tokenId)

    return res.json(contact)
}

const updateContactController = async (req: Request, res: Response) => {
    const contactData: iContactUpdate = req.body
    const idContact = parseInt(req.params.id)
    const updatedContact = await updateContactService(contactData, idContact)

    return res.json(updatedContact)
}

export {
    createContactController,
    deleteContactController,
    listContactsController,
    listContactByIdController,
    updateContactController
}