import { ResetPasswordRequest } from '@prisma/client';

export type ResetPasswordRequestSaveDto = Omit<ResetPasswordRequest, 'id' | 'createdAt'>;
export type ResetPasswordRequestCreateDto = Omit<ResetPasswordRequest, 'id' | 'createdAt'>;
export type ResetPasswordRequestGetOrCreateDto = Omit<ResetPasswordRequest, 'id'>;