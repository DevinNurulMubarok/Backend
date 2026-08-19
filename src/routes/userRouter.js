import express from "express";
import { createUserController, getUserController, getUsersController, } from "../controllers/user.controllers.js";
import { createUserValidator } from "../validators/user.validator.js";
const userRouter = express.Router();
// GET /users
userRouter.get("/", getUsersController);
// GET /users/:id
userRouter.get("/:id", getUserController);
// POST /users
userRouter.post("/", createUserValidator, createUserController);
// PUT /users/:id
userRouter.post("/:id", createUserValidator, createUserController);
export { userRouter };
