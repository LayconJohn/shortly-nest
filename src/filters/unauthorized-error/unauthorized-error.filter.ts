import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { UnauthorzedError } from "src/errors/index";

@Catch(UnauthorzedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(401).json({
            statusCode: 401,
            message: exception.message
        })
    }
}