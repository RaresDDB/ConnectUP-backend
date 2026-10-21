import { PrismaClient } from '@prisma/client';
import { FavoriteCreateRepoDto } from '../types/favorite-types';

class FavoriteRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: FavoriteCreateRepoDto) {
        return this.client.favorite.create({ data });
    }

    async findByEventIdAndMemberId(eventId: string, memberId: string) {
        return this.client.favorite.findFirst({
            where: {
                eventId,
                memberId
            }
        });
    }

    async deleteByEventIdAndMemberId(eventId: string, memberId: string) {
        return this.client.favorite.delete({
            where: {
                eventId_memberId: {
                    eventId,
                    memberId
                }
            }
        })
    }
}

export default FavoriteRepository;
