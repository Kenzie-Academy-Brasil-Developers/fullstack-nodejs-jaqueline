import { Request, Response } from "express";

import {
  createContactService,
  deleteContactService,
  readAllContactsService,
  updateContactService,
} from "../services/contact.service";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  

  const contact = await createContactService(req.body);
  return res.status(201).json(contact);


};

export const readAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contacts = await readAllContactsService();
  return res.status(200).json(contacts);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contact } = res.locals;

  const newContact = await updateContactService(req.body, contact);
  return res.status(200).json(newContact);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contact } = res.locals;

  await deleteContactService(contact);
  return res.status(204).json();
};
