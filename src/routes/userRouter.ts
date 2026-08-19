import express from "express";

import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controllers.js";

import { createUserValidator } from "../validators/user.validator.js";

const userRouter = express.Router();

// GET /users - Get all users
userRouter.get("/", getUsersController);

// GET /users/:id - Get single user by ID
userRouter.get("/:id", getUserController);

// POST /users - Create new user
userRouter.post("/", createUserValidator, createUserController);

// PUT /users/:id - Replace entire user (full update)
userRouter.put("/:id", createUserValidator, createUserController);

// PATCH /users/:id - Partial update user
userRouter.patch("/:id", updateUserController);

// DELETE /users/:id - Delete user
userRouter.delete("/:id", deleteUserController);

export { userRouter };