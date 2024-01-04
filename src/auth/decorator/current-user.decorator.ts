import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/entities/User";
import { AuthRequest } from "../models/AuthRequest";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest<AuthRequest>();
        return request.user;
    }
);