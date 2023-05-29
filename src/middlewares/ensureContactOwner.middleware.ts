import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Contact } from "../entities/contact.entity";
import { iContactRepo } from "../interfaces/contacts.interface";
import { AppDataSource } from "../data-source";


const ensureContactOwnerMiddleware = async (
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userIdLogged: number = parseInt(req.user.id);
    const contactId: number = parseInt(req.params.id);

    const contactRepository: iContactRepo = AppDataSource.getRepository(Contact)

    try {
        const contact = await contactRepository.findOne({
            where: {
                id: contactId
            },
            relations:
            ["user"]
        })

        if (!contact) {
            throw new AppError("Contact not found", 404);
        }

        if (contact.user.id !== userIdLogged) {
            throw new AppError("Insufficient permission", 403);
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export default ensureContactOwnerMiddleware;
