import { PrismaClient } from '@prisma/client';
import {
    ChangeEmailRequestSaveDto,
    ChangeEmailRequestPatchByIdRepoDto
} from '../types/change-email-request-types';

class ChangeEmailRequestRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async save(data: ChangeEmailRequestSaveDto) {
        return this.client.changeEmailRequest.create({ data });
    }

    async findAll() {
        return this.client.changeEmailRequest.findMany();
    }

    async findById(id: string) {
        return this.client.changeEmailRequest.findUnique({ where: { id } });
    }

    async findByToken(token: string) {
        return this.client.changeEmailRequest.findUnique({ where: { token } });
    }

    async existsByToken(token: string) {
        const count = await this.client.changeEmailRequest.count({ where: { token } });
        return count > 0;
    }

    async patchById(id: string, data: ChangeEmailRequestPatchByIdRepoDto) {
        return this.client.changeEmailRequest.update({
            where: { id },
            data
        });
    }

    async deleteAllByUserId(userId: string) {
        return this.client.changeEmailRequest.deleteMany({
            where: {
                userId
            }
        });
    }
}

export default ChangeEmailRequestRepository;