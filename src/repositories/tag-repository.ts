import { PrismaClient } from '@prisma/client';
import { TagCreateRepoDto } from '../types/tag-types';

class TagRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: TagCreateRepoDto) {
        return this.client.tag.create({ data });
    }

    async findAll() {
        return this.client.tag.findMany();
    }

    async findById(id: string) {
        return this.client.tag.findUnique({ where: { id } });
    }

    async findByName(name: string) {
        return this.client.tag.findUnique({ where: { name } });
    }
}

export default TagRepository;
