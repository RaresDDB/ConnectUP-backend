import { PrismaClient } from '@prisma/client';
import {
    ChangePasswordRequestSaveDto,
    ChangePasswordRequestPatchByIdRepoDto
} from '../types/change-password-request-types';

class ChangePasswordRequestRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async save(data: ChangePasswordRequestSaveDto) {
        return this.client.changePasswordRequest.create({ data });
    }

    async findAll() {
        return this.client.changePasswordRequest.findMany();
    }

    async findById(id: string) {
        return this.client.changePasswordRequest.findUnique({ where: { id } });
    }

    async findByToken(token: string) {
        return this.client.changePasswordRequest.findUnique({ where: { token } });
    }

    async existsByToken(token: string) {
        const count = await this.client.changePasswordRequest.count({
            where: { token }
        });
        return count > 0;
    }

    async patchById(id: string, data: ChangePasswordRequestPatchByIdRepoDto) {
        return this.client.changePasswordRequest.update({
            where: { id },
            data
        });
    }

    async deleteAllByUserId(userId: string) {
        return this.client.changePasswordRequest.deleteMany({
            where: {
                userId
            }
        });
    }
}

export default ChangePasswordRequestRepository;