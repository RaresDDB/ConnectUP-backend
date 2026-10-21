import { PrismaClient } from '@prisma/client';
import { PaidEventCreateRepoDto } from '../types/paid-event-types';

class PaidEventRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: PaidEventCreateRepoDto) {
        return this.client.paidEvent.create({ data });
    }
}

export default PaidEventRepository;
