import { PrismaClient } from '@prisma/client';
import { PendingMemberCreateRepoDto } from '../types/pending-member-types';

class PendingMemberRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: PendingMemberCreateRepoDto) {
        return this.client.pendingMember.create({ data });
    }

    async findAll() {
        return this.client.pendingMember.findMany();
    }

    async findById(id: string) {
        return this.client.pendingMember.findUnique({
            where: {
                id,
            },
        });
    }

    async findByEmail(email: string) {
        return this.client.pendingMember.findUnique({
            where: {
                email,
            },
        });
    }

    async findByToken(token: string) {
        return this.client.pendingMember.findUnique({
            where: {
                token,
            },
        });
    }

    async deleteById(id: string) {
        return this.client.pendingMember.delete({
            where: {
                id,
            },
        });
    }
}

export default PendingMemberRepository;
