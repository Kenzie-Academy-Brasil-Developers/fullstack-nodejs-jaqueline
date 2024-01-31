import "dotenv/config";
import { compare } from "bcryptjs";
import AppError from "../errors/AppErrors.error";
import { clientRepo } from "../repositories";
import { sign } from "jsonwebtoken";
import Client from "../entities/Client.entity";
import { ClientLogin, LoginReturn } from "../interfaces/clients.interface";

export const loginService = async (data: ClientLogin): Promise<LoginReturn> => {
  const { email } = data;
  const client: Client | null = await clientRepo.findOneBy({ email });

  if (!client) throw new AppError("Invalid email", 401);

  const comparePass = await compare(data.password, client.password);

  if (!comparePass) throw new AppError("Invalid password", 401);

  const token: string = sign(
    { email: client.email, admin: client.admin },
    process.env.SECRET_KEY!,
    { subject: client.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  const admin = client.admin;

  const telephone = client.telephone;

  const name = client.name;

  const emailUser = client.email;

  const dataLogin = {
    token: token,
    admin: admin,
    telephone: telephone,
    name: name,
    email: emailUser,
  };
  return dataLogin;
};
