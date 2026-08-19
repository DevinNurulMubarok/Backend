import { Request, Response } from "express";
import {
  createUserService,
  getUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService.js";

export const getUsersController = async (_req: Request, res: Response) => {
  const result = await getUsersService();
  res.status(200).send(result);
};

export const createUserController = async (req: Request, res: Response) => {
  console.log("REQ BODY:", req.body);
  const result = await createUserService(req.body);
  res.status(201).send(result);
};

export const getUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await getUserService(id);
  res.status(200).send(result);
};

export const updateUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  const result = await updateUserService(id, body);
  res.status(200).send(result);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await deleteUserService(id);
  res.status(200).send(result);
};