import ConflictException from "../exceptions/conflict-exception";
import NotFoundException from "../exceptions/not-found-exception";
import FavoriteRepository from "../repositories/favorite-repository";
import {
    FavoriteCreateServiceDto,
    FavoriteDeleteServiceDto
} from "../types/favorite-types";

class FavoriteService {
    private repository: FavoriteRepository;

    constructor(
        repository: FavoriteRepository
    ) {
        this.repository = repository;
    }

    async create(data: FavoriteCreateServiceDto) {
        const favorite = await this.repository.findByEventIdAndMemberId(data.eventId, data.memberId);

        if (favorite) {
            throw new ConflictException('You have already added this event to the favorites!');
        }

        await this.repository.create(data);
    }

    async delete(data: FavoriteDeleteServiceDto) {
        const favorite = await this.repository.findByEventIdAndMemberId(data.eventId, data.memberId);

        if (!favorite) {
            throw new NotFoundException('This event is not added to favorites!');
        }

        await this.repository.deleteByEventIdAndMemberId(data.eventId, data.memberId);
    }


    async existsByEventIdAndMemberId(eventId: string, memberId: string) {
        const favorite = await this.repository.findByEventIdAndMemberId(eventId, memberId);
        return !!favorite;
    }
}

export default FavoriteService;