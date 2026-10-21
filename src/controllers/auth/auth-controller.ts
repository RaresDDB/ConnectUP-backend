import AuthService from '../../services/auth-service';
import asyncHandler from 'express-async-handler';
import AuthValidator from '../../validators/auth-validator';
import { MessageResponsePayload } from '../../responses/message-response-payload';


class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    register = asyncHandler(async (req, res) => {
        const requestPayload = AuthValidator.validateRegister(req.body, req.file);
        await this.authService.register(requestPayload);
        res.json(MessageResponsePayload.info('Registration success, check the email for registration link!'));
    })

    activate = asyncHandler(async (req, res) => {
        const requestPayload = AuthValidator.validateActivate(req.body);
        await this.authService.activate(requestPayload);
        res.json(MessageResponsePayload.success('The account has been activated, now you can log in!'));
    })

    login = asyncHandler(async (req, res) => {
        const requestPayload = AuthValidator.validateLogin(req.body);

        const token = await this.authService.login(requestPayload);

        res.cookie(
            'accessToken',
            token,
            {
                httpOnly: true,
                secure: false,
                maxAge: 3600000 * 24,
                sameSite: 'strict',
            }
        );

        res.json(MessageResponsePayload.success('You have logged in successfully!'));
    })

    user = asyncHandler(async (req, res) => {
        res.json(req.user);
    });

    logout = asyncHandler(async (_req, res) => {
        res.clearCookie('access-token');
        res.json(MessageResponsePayload.success('You have logged out successfully!'));
    });

    forgotPassword = asyncHandler(async (req, res) => {
        const requestPayload = AuthValidator.validateForgotPassword(req.body);
        await this.authService.forgotPassword(requestPayload);
        res.json(MessageResponsePayload.info('An email has been sent containing instructions to reset your password!'));
    });

    resetPassword = asyncHandler(async (req, res) => {
        const requestPayload = AuthValidator.validateResetPassword(req.body);
        await this.authService.resetPassword(requestPayload);
        res.json(MessageResponsePayload.success('Your password has been successfully changed!'));
    });

    changeEmail = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { newEmail } = req.body;
        await this.authService.changeEmail(userId, newEmail);
        res.json(MessageResponsePayload.info('An email has been sent with confirmation link!'));
    });

    changePassword = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { newPassword, currentPassword } = req.body;
        await this.authService.changePassword(userId, newPassword, currentPassword);
        res.json(MessageResponsePayload.info('An email has been sent with confirmation link!'));
    })

    confirmChangeEmail = asyncHandler(async (req, res) => {
        const { token } = req.body;
        const newEmail = await this.authService.confirmChangeEmail(token);
        res.json({
            ...MessageResponsePayload.success('Email has been updated successfully!'),
            newEmail
        });
    });

    confirmChangePassword = asyncHandler(async (req, res) => {
        const { token } = req.body;
        console.log(token);
        await this.authService.confirmChangePassword(token);
        res.json(MessageResponsePayload.success('Password has been updated successfully!'));
    });
}

export default AuthController;