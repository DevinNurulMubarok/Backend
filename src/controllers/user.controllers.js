import { createUserService, getUsersService, getUserService, updateUserService, } from "../services/userService.js";
export const getUsersController = async (_req, res) => {
    const result = await getUsersService();
    res.status(200).json(result);
};
export const createUserController = async (req, res) => {
    console.log("REQ BODY:", req.body);
    const result = await createUserService(req.body);
    res.status(201).json(result);
};
export const getUserController = async (req, res) => {
    const id = Number(req.params.id);
    const result = await getUserService(id);
    res.status(200).json(result);
};
export const updateUserController = async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const result = await updateUserService(id, body);
    res.status(200).json(result);
};
