import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppErrors.error";
import { clientRepo } from "../repositories";
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

export const verifyEmailIsTheSame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    // Obtenha o cliente existente pelo ID
    const clientsEmails = await clientRepo.findOneBy({ email });

    // Verifique se o email foi alterado
    if (clientsEmails !== email) {
      // Se o email foi alterado, atualize o cliente
      return next();
    } else {
      // Se o email não foi alterado, retorne uma mensagem indicando que o email permanece o mesmo
      res.status(200).send({ message: 'The email was note altered' });
    }
  } catch (error) {
    // Se ocorrer um erro, retorne uma resposta de erro
    throw new AppError("Internal Error", 500);
  }
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
