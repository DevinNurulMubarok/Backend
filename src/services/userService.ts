import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";
import type { User } from "../generated/prisma/client.js";

export const getUsersService = async () => {
  const users = await prisma.user.findMany({
    omit: { password: true },
  });

  return users;
};

export const getUserService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: { password: true },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

export const createUserService = async (body: {
  name: string;
  email: string;
  password: string;
  gender: string;
}) => {
  console.log("DATA MASUK SERVICE:", body);

  if (!body.gender) {
    throw new ApiError("Gender wajib diisi", 400);
  }

  // Normalize gender ke uppercase
  const normalizedGender = body.gender.toUpperCase();

  // Validasi gender hanya MALE atau FEMALE
  if (!["MALE", "FEMALE"].includes(normalizedGender)) {
    throw new ApiError("Gender harus MALE atau FEMALE", 400);
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      role: "USER",
      gender: normalizedGender as "MALE" | "FEMALE",
    },
    omit: {
      password: true,
    },
  });

  return {
    message: "Add new user success",
    data: user,
  };
};

export const updateUserService = async (
  id: number,
  body: Partial<
    Pick<User, "name" | "email" | "password" | "profilePic" | "role" | "gender">
  >,
) => {
  // 1. Pastikan user ada
  await getUserService(id);

  // 2. Kalau gender diubah, normalize dan validasi
  if (body.gender) {
    const normalizedGender = body.gender.toUpperCase();
    if (!["MALE", "FEMALE"].includes(normalizedGender)) {
      throw new ApiError("Gender harus MALE atau FEMALE", 400);
    }
    body.gender = normalizedGender as "MALE" | "FEMALE";
  }

  // 3. Kalau email diubah, cek apakah sudah digunakan user lain
  if (body.email) {
    const userEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userEmail && userEmail.id !== id) {
      throw new ApiError("Email already exist", 400);
    }
  }

  // 4. Update user
  await prisma.user.update({
    where: {
      id,
    },
    data: body,
  });

  return {
    message: "Update user success",
  };
};

export const deleteUserService = async (id: number) => {
  await getUserService(id);
  await prisma.user.delete({
    where: {
      id,
    },
  });

  return { message: "Delete user success" };
};