import { Request } from "express";
import { User } from "src/services/users/entities/User";

export interface AuthRequest extends Request {
    email: string;
    password: string;
}