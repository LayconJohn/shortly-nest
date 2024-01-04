import { Request } from "express";
import { User } from "src/users/entities/User";

export interface AuthRequest extends Request {
    user: User;
}