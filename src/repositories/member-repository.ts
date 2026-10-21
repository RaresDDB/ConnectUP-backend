import { PrismaClient } from '@prisma/client';
import { MemberCreateRepoDto } from '../types/member-types';

const INCLUDE = {
    user: {
        include: {
            role: true,
            userTags: {
                include: {
                    tag: true
                }
            }
        }
    }
};

class MemberRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: MemberCreateRepoDto) {
        return this.client.member.create({ data });
    }

    async findById(id: string) {
        return this.client.member.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        });
    }

    async findAll() {
        return this.client.member.findMany(
            {
                include: INCLUDE
            }
        );
    }

    async findByUsername(username: string) {
        return this.client.member.findFirst({
            where: {
                user: {
                    username
                }
            },
            include: INCLUDE
        });
    }
}

export default MemberRepository;
