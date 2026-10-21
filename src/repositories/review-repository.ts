import { PrismaClient } from '@prisma/client';
import { ReviewCreateRepoDto } from '../types/review-types';

class ReviewRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: ReviewCreateRepoDto) {
        return this.client.review.create({
            data,
            include: {
                member: {
                    include: {
                        user: {
                            include: {
                                role: true
                            }
                        }
                    }
                }
            }
        });
    }

    async findAll() {
        return this.client.review.findMany();
    }

    async findById(id: string) {
        return this.client.review.findUnique({ where: { id } });
    }
}

export default ReviewRepository;
