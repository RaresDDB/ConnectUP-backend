import { User } from "@prisma/client";
import { PendingMemberCreateServiceDto } from "./pending-member-types";

export type LoginRequestDto = Pick<User, "email" | "password">;
export type RegisterRequestDto = PendingMemberCreateServiceDto;
export type ActivateRequestDto = { token: string; };
export type ChangeEmailRequestDto = { newEmail: string; };
export type ResetPasswordRequestDto = { token: string; newPassword: string; }
export type ForgotPasswordRequestDto = Pick<User, "email">;
export type ChangePasswordRequestDto = Pick<User, "password"> & { newPassword: string; };
export type ConfirmChangeEmailRequestDto = { token: string; };
export type ConfirmResetPasswordRequestDto = { token: string; };