import { PrismaClient } from '@prisma/client';
import { UserCreateRepoDto, UserPatchByIdRepoDto, UserUpdateByIdRepoDto } from '../types/user-types';

const INCLUDE = {
    role: true,
    userTags: {
        include: {
            tag: true
        }
    }
};

class UserRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: UserCreateRepoDto) {
        return this.client.user.create({
            data,
            include: INCLUDE
        });
    }

    async findAll() {
        return this.client.user.findMany({
            include: INCLUDE
        });
    }

    async findById(id: string) {
        return this.client.user.findUnique({
            where: {
                id
            },
            include: INCLUDE
        });
    }

    async findByEmail(email: string) {
        return this.client.user.findUnique({
            where: {
                email
            },
            include: INCLUDE
        });
    }

    async findByUsername(username: string) {
        return this.client.user.findUnique({
            where: {
                username
            },
            include: INCLUDE
        });
    }

    async existsById(id: string) {
        const count = await this.client.user.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async existsByEmail(email: string) {
        const count = await this.client.user.count({
            where: {
                email
            }
        });
        return count > 0;
    }

    async updateById(id: string, data: UserUpdateByIdRepoDto) {
        return this.client.user.update({
            where: {
                id
            },
            data,
            include: INCLUDE
        });
    }

    async patchById(id: string, data: UserPatchByIdRepoDto) {
        return this.client.user.update({
            where: {
                id
            },
            data,
            include: INCLUDE
        });
    }
}

export default UserRepository;
