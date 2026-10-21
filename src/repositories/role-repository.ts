import { PrismaClient } from '@prisma/client';
import { RoleCreateRepoDto } from '../types/role-types';

class RoleRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: RoleCreateRepoDto) {
        return this.client.role.create({ data });
    }

    async findAll() {
        return this.client.role.findMany();
    }

    async findById(id: string) {
        return this.client.role.findUnique({ where: { id } });
    }

    async findByName(name: string) {
        return this.client.role.findUnique({ where: { name } })
    }
}

export default RoleRepository;
