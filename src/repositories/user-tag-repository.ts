import { PrismaClient } from '@prisma/client';
import { UserTagCreateRepoDto, UserTagDeleteRepoDto } from '../types/user-tag-types';

class MemberTagRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: UserTagCreateRepoDto) {
        return this.client.userTag.create({ data });
    }

    async findByUserIdAndTagId(userId: string, tagId: string) {
        return this.client.userTag.findFirst({
            where: {
                userId,
                tagId
            }
        });
    }

    async delete(data: UserTagDeleteRepoDto) {
        return this.client.userTag.deleteMany({
            where: {
                userId: data.userId,
                tagId: data.tagId
            }
        });
    }
}

export default MemberTagRepository;
