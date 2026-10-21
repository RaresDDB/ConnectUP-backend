import BadRequestException from "../exceptions/bad-request-exception";
import { UserDto } from "../types/user-types";
import {
    ResetPasswordRequestDto,
    ForgotPasswordRequestDto
} from "../types/auth-types";
import {
    LoginRequestPayload,
    RegisterRequestPayload,
    ActivateRequestPayload
} from "../requests/auth-request-payload";

class AuthValidator {
    public static validateAuth(user?: UserDto): UserDto {
        if (!user) {
            throw new BadRequestException(`You need to log in first!`);
        }
        return user;
    }

    public static validateRegister(data: Record<string, any>, file?: Express.Multer.File): RegisterRequestPayload {
        const fields: string[] = ["firstName", "lastName", "email", "password", "birthDate", "username", "gender", "tags"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            password: data.password,
            tags: JSON.parse(data.tags),
            gender: data.gender,
            birthDate: new Date(data.birthDate),
            avatarUri: file ? file.filename : null,
        }
    }

    public static validateActivate(data: Record<string, string>): ActivateRequestPayload {
        const fields: string[] = ["token"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            token: data.token
        }
    }

    public static validateLogin(data: Record<string, string>): LoginRequestPayload {
        const fields: string[] = ["email", "password"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            email: data.email,
            password: data.password
        }
    }

    public static validateForgotPassword(data: Record<string, string>): ForgotPasswordRequestDto {
        const fields: string[] = ['email'];

        for (const field of fields) {
            if (!data.hasOwnProperty(field)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            email: data.email
        }
    }

    public static validateResetPassword(data: Record<string, string>): ResetPasswordRequestDto {
        const fields: string[] = ['token', 'newPassword'];

        for (const field of fields) {
            if (!data.hasOwnProperty(field)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            token: data.token,
            newPassword: data.newPassword
        }
    }
}

export default AuthValidator;