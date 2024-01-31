import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppErrors.error";
import { clientRepo, contactRepo } from "../repositories";
import Contact from "../entities/Contact.entity";
import { ZodTypeAny } from "zod";

export const verifyUniqueContactEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (email) {
    const contactsEmails: Contact | null = await contactRepo.findOneBy({ email });

    if (contactsEmails) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export const validateBodyContact =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export const verifyContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const contact: Contact | null = await contactRepo.findOneBy({
    id: Number(id),
  });

  if (!contact) throw new AppError("Contact not found", 404);

  res.locals = { ...res.locals, contact };

  return next();
};

export const verifyBodyClientExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { clientId } = req.body;

  const client = await clientRepo.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  res.locals = { ...res.locals, client };

  return next();
};


