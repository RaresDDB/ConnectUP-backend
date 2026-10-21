import { PrismaClient } from '@prisma/client';
import { ResetPasswordRequestSaveDto } from '../types/reset-password-request-types';

class ResetPasswordRequestRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async save(data: ResetPasswordRequestSaveDto) {
        return this.client.resetPasswordRequest.create({ data });
    }

    async findAll() {
        return this.client.resetPasswordRequest.findMany();
    }

    async findById(id: string) {
        return this.client.resetPasswordRequest.findUnique({ where: { id } });
    }

    async findByToken(token: string) {
        return this.client.resetPasswordRequest.findUnique({ where: { token } })
    }

    async deleteAllByUserId(userId: string) {
        return this.client.resetPasswordRequest.deleteMany({
            where: {
                userId
            }
        })
    }
}

export default ResetPasswordRequestRepository;
