import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppErrors.error";
import { clientRepo, contactRepo } from "../repositories";
import Client from "../entities/Client.entity";
import { ZodTypeAny } from "zod";

export const verifyUniqueClientEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (email) {
    const clientsEmails: Client | null = await clientRepo.findOneBy({ email });

    if (clientsEmails) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export const validateBodyClient =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    if (typeof req.body.admin === "undefined") {
      req.body.admin = false;
    }

    next();
  };

export const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const user: Client | null = await clientRepo.findOneBy({ id: Number(id) });

  if (!user) throw new AppError("Client not found", 404);

  res.locals = { ...res.locals, user };

  return next();
};
