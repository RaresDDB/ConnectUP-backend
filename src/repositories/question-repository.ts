import { PrismaClient } from '@prisma/client';
import { QuestionCreateRepoDto } from '../types/question-types';

const INCLUDE = {
    member: {
        include: {
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
        }
    }
};

class QuestionRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: QuestionCreateRepoDto) {
        return this.client.question.create({
            data,
            include: INCLUDE
        });
    }

    async findAll() {
        return this.client.question.findMany({
            include: INCLUDE,
            orderBy: {
                postedAt: 'desc'
            }
        });
    }

    async findById(id: string) {
        return this.client.question.findUnique({
            where: { id },
            include: INCLUDE
        });
    }
}

export default QuestionRepository;
