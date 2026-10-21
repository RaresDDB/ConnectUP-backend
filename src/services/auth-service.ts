import JwtUtils from "../utils/jwt-utils";
import EmailUtils from "../utils/email-utils";
import UserService from "./user-service";
import MemberMapper from "../mappers/member-mapper";
import MemberService from "./member-service";
import PasswordUtils from "../utils/password-utils";
import ConflictException from "../exceptions/conflict-exception";
import NotFoundException from "../exceptions/not-found-exception";
import PendingMemberService from "./pending-member-service";
import UnauthorizedException from "../exceptions/unauthorized-exception";
import ChangeEmailRequestService from "./change-email-request-service";
import ResetPasswordRequestService from "./reset-password-request-service";
import ChangePasswordRequestService from "./change-password-request-service";
import { UserConstants } from "../constants/user-constants";
import {
    LoginRequestDto,
    RegisterRequestDto,
    ActivateRequestDto,
    ForgotPasswordRequestDto,
    ResetPasswordRequestDto
} from "../types/auth-types";

class AuthService {
    private userService: UserService;
    private memberService: MemberService;
    private pendingMemberService: PendingMemberService;
    private changeEmailRequestService: ChangeEmailRequestService;
    private resetPasswordRequestService: ResetPasswordRequestService;
    private changePasswordRequestService: ChangePasswordRequestService;

    constructor(
        userService: UserService,
        memberService: MemberService,
        pendingMemberService: PendingMemberService,
        changeEmailRequestService: ChangeEmailRequestService,
        resetPasswordRequestService: ResetPasswordRequestService,
        changePasswordRequestService: ChangePasswordRequestService
    ) {
        this.userService = userService;
        this.memberService = memberService;
        this.pendingMemberService = pendingMemberService;
        this.changeEmailRequestService = changeEmailRequestService;
        this.resetPasswordRequestService = resetPasswordRequestService;
        this.changePasswordRequestService = changePasswordRequestService;
    }

    async register(data: RegisterRequestDto) {
        await this.pendingMemberService.create(data);
    }

    async activate(data: ActivateRequestDto) {
        const { token } = data;

        const pendingMember = await this.pendingMemberService.getByToken(token);

        JwtUtils.verifyActivateToken(token);

        await this.memberService.create(MemberMapper.pendingMemberToCreateServiceDto(pendingMember));

        await this.pendingMemberService.deleteById(pendingMember.id);
    }

    async login(data: LoginRequestDto) {
        const { email, password } = data;

        const user = await this.userService.getModelByEmail(email);

        const passwordsMatch = await PasswordUtils.comparePassword(password, user.password);

        if (!passwordsMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }


        return JwtUtils.generateAccessToken(email);
    }

    async forgotPassword(data: ForgotPasswordRequestDto) {
        const { email } = data;

        const user = await this.userService.getModelByEmail(email);

        if (!user) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_EMAIL);
        }

        const token = JwtUtils.generateResetPasswordToken(email);

        console.log(token);

        await EmailUtils.sendForgotPasswordEmail(email, token);

        return this.resetPasswordRequestService.create({
            token,
            userId: user.id
        })
    }

    async resetPassword(data: ResetPasswordRequestDto) {
        const { token, newPassword } = data;

        JwtUtils.verifyResetPasswordToken(token);

        const resetPasswordRequest = await this.resetPasswordRequestService.getByToken(token);

        const user = await this.userService.getModelById(resetPasswordRequest.userId);

        if (!user) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_ID);
        }

        const newPasswordHashed = await PasswordUtils.hashPassword(newPassword);

        await this.userService.updatePasswordById(user.id, newPasswordHashed);

        await this.resetPasswordRequestService.deleteAllByUserId(user.id);
    }

    async changeEmail(userId: string, newEmail: string): Promise<void> {
        const userExists = await this.userService.existsByEmail(newEmail);

        if (userExists) {
            throw new ConflictException(UserConstants.ALREADY_EXISTS_BY_EMAIL);
        }

        const user = await this.userService.getModelById(userId);

        const token = JwtUtils.generateChangeEmailToken(userId);

        console.log(token);

        await this.changeEmailRequestService.create({
            token,
            userId,
            newEmail,
            oldEmail: user.email
        });

        await EmailUtils.sendChangeEmailEmail(user.email, token);
    }

    async changePassword(userId: string, newPassword: string, currentPassword: string): Promise<void> {
        const user = await this.userService.getModelById(userId);

        const isPasswordMatch = await PasswordUtils.comparePassword(currentPassword, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid current password!');
        }

        const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);

        const token = JwtUtils.generateChangePasswordToken(userId);

        console.log(token);

        await this.changePasswordRequestService.create({
            token,
            userId,
            oldPassword: user.password,
            newPassword: hashedNewPassword
        });

        await EmailUtils.sendChangePasswordEmail(user.email, token);
    }

    async confirmChangeEmail(token: string): Promise<string> {
        JwtUtils.verifyChangeEmailToken(token);

        const changeEmailRequest = await this.changeEmailRequestService.getByToken(token);

        await this.userService.updateEmailById(
            changeEmailRequest.userId,
            changeEmailRequest.newEmail
        );

        await this.changeEmailRequestService.resolve(changeEmailRequest.id);

        return changeEmailRequest.newEmail;
    }

    async confirmChangePassword(token: string): Promise<void> {
        JwtUtils.verifyChangePasswordToken(token);

        const changePasswordRequest = await this.changePasswordRequestService.getByToken(token);

        await this.userService.updatePasswordById(
            changePasswordRequest.userId,
            changePasswordRequest.newPassword
        );

        await this.changePasswordRequestService.resolve(changePasswordRequest.id);
    }
}

export default AuthService;