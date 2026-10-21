import { ChangeEmailRequest } from '@prisma/client';

export type ChangeEmailRequestSaveDto = Omit<ChangeEmailRequest, 'id' | 'createdAt' | 'resolvedAt'>;
export type ChangeEmailRequestCreateDto = Omit<ChangeEmailRequest, 'id' | 'createdAt' | 'resolvedAt'>;
export type ChangeEmailRequestGetOrCreateDto = Omit<ChangeEmailRequest, 'id'>;
export type ChangeEmailRequestPatchByIdRepoDto = Partial<Omit<ChangeEmailRequest, 'id' | 'createdAt'>>;
export type ChangeEmailRequestPatchByIdServiceDto = Partial<Omit<ChangeEmailRequest, 'id' | 'createdAt'>>;