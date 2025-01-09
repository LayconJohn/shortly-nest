import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { BadRequesterror } from "src/infra/utils/errors/index";

@Catch(BadRequesterror)
export class BadRequestErrorFilter implements ExceptionFilter {
    catch(exception: BadRequesterror, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(400).json({
            statusCode: 400,
            message: exception.message
        })
    }
}