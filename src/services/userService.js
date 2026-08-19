import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";
export const getUsersService = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true,
        },
    });
    return users;
};
export const getUserService = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        omit: {
            password: true,
        },
    });
    if (!user) {
        throw new ApiError("User not found", 404);
    }
    return user;
};
export const createUserService = async (body) => {
    console.log("DATA MASUK SERVICE:", body);
    if (!body.gender) {
        throw new ApiError("Gender wajib diisi", 400);
    }
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
            role: "USER",
            gender: body.gender,
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
export const updateUserService = async (id, body) => {
    // 1. Pastikan user ada
    await getUserService(id);
    // 2. Kalau email diubah, cek apakah sudah digunakan user lain
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
    // 3. Update user
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
