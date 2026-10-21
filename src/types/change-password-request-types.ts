import { ChangePasswordRequest } from '@prisma/client';

export type ChangePasswordRequestSaveDto = Omit<ChangePasswordRequest, 'id' | 'createdAt' | 'resolvedAt'>;
export type ChangePasswordRequestCreateDto = Omit<ChangePasswordRequest, 'id' | 'createdAt' | 'resolvedAt'>;
export type ChangePasswordRequestGetOrCreateDto = Omit<ChangePasswordRequest, 'id'>;
export type ChangePasswordRequestPatchByIdRepoDto = Partial<Omit<ChangePasswordRequest, 'id' | 'createdAt'>>;
export type ChangePasswordRequestPatchByIdServiceDto = Partial<Omit<ChangePasswordRequest, 'id' | 'createdAt'>>;