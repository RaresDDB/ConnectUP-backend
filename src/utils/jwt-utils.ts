import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

class JwtUtils {
    public static generateActivateToken(email: string): string {
        if (!process.env.JWT_ACTIVATE_TOKEN_SECRET) {
            throw new Error('JWT_ACTIVATE_TOKEN_SECRET is not defined!')
        }

        return jwt.sign({ email }, process.env.JWT_ACTIVATE_TOKEN_SECRET, {
            expiresIn: '1d',
        })
    }

    public static generateAccessToken(email: string): string {
        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined!')
        }

        return jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        })
    }

    public static generateResetPasswordToken(email: string): string {
        if (!process.env.JWT_RESET_PASSWORD_TOKEN_SECRET) {
            throw new Error('JWT_RESET_PASSWORD_TOKEN_SECRET is not defined!')
        }

        return jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_TOKEN_SECRET, {
            expiresIn: '1d',
        })
    }

    public static generateChangeEmailToken(email: string): string {
        if (!process.env.JWT_CHANGE_EMAIL_TOKEN_SECRET) {
            throw new Error('JWT_CHANGE_EMAIL_TOKEN_SECRET is not defined!')
        }

        return jwt.sign({ email }, process.env.JWT_CHANGE_EMAIL_TOKEN_SECRET, {
            expiresIn: '1d',
        })
    }

    public static generateChangePasswordToken(email: string): string {
        if (!process.env.JWT_CHANGE_PASSWORD_TOKEN_SECRET) {
            throw new Error('JWT_CHANGE_PASSWORD_TOKEN_SECRET is not defined!')
        }

        return jwt.sign({ email }, process.env.JWT_CHANGE_PASSWORD_TOKEN_SECRET, {
            expiresIn: '1d',
        })
    }

    public static verifyActivateToken(token: string) {
        if (!process.env.JWT_ACTIVATE_TOKEN_SECRET) {
            throw new Error('JWT_ACTIVATE_TOKEN_SECRET is not defined!')
        }

        jwt.verify(token, process.env.JWT_ACTIVATE_TOKEN_SECRET);
    }

    public static verifyAccessToken(token: string) {
        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined!')
        }

        const { email } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;

        return email;
    }

    public static verifyResetPasswordToken(token: string) {
        if (!process.env.JWT_RESET_PASSWORD_TOKEN_SECRET) {
            throw new Error('JWT_RESET_PASSWORD_TOKEN_SECRET is not defined!')
        }

        jwt.verify(token, process.env.JWT_RESET_PASSWORD_TOKEN_SECRET);
    }

    public static verifyChangeEmailToken(token: string) {
        if (!process.env.JWT_CHANGE_EMAIL_TOKEN_SECRET) {
            throw new Error('JWT_CHANGE_EMAIL_TOKEN_SECRET is not defined!')
        }

        jwt.verify(token, process.env.JWT_CHANGE_EMAIL_TOKEN_SECRET);
    }

    public static verifyChangePasswordToken(token: string) {
        if (!process.env.JWT_CHANGE_PASSWORD_TOKEN_SECRET) {
            throw new Error('JWT_CHANGE_PASSWORD_TOKEN_SECRET is not defined!')
        }

        jwt.verify(token, process.env.JWT_CHANGE_PASSWORD_TOKEN_SECRET);
    }
}

export default JwtUtils;