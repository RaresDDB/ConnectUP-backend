import JwtUtils from "../utils/jwt-utils";
import UnauthorizedException from "../exceptions/unauthorized-exception";
import { UserDto } from "../types/user-types";
import { userService } from "../services";
import {
    Request,
    Response,
    NextFunction
} from "express";

declare global {
    namespace Express {
        interface Request {
            user: UserDto;
        }
    }
}

export default async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['accessToken'];

        if (!token) {
            throw new UnauthorizedException('Authentication required');
        }

        const email = JwtUtils.verifyAccessToken(token);

        const user = await userService.getDtoByEmail(email);

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}