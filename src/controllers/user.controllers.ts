import { Request, Response } from "express";
import { createUserService, getUserService } from "../services/userService.js";

export const getUsersController = (_req: Request, res: Response) => {
  const result = getUserService();
  res.status(200).send(result);
};

export const createUserController = (req: Request, res: Response) => {
  const result = createUserService(req.body);
  res.status(200).send(result);
};

export const getUserController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = getUserService(id);
  res.status(200).send(result);
}; 