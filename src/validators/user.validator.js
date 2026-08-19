import { ApiError } from "../utils/api-error.js";
export const createUserValidator = (req, _res, next) => {
    if (!req.body.name) {
        throw new ApiError("Name is required", 400);
    }
    if (!req.body.email) {
        throw new ApiError("Email is required", 400);
    }
    if (!req.body.password) {
        throw new ApiError("Password is required", 400);
    }
    next();
};
