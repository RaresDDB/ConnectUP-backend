import ConflictException from "../exceptions/conflict-exception";
import UserTagRepository from "../repositories/user-tag-repository";
import { UserTag } from "@prisma/client";
import { UserTagCreateServiceDto } from "../types/user-tag-types";

class UserTagService {
    private repository: UserTagRepository;

    constructor(repository: UserTagRepository) {
        this.repository = repository;
    }

    async create(data: UserTagCreateServiceDto): Promise<UserTag> {
        const userTag = await this.repository.findByUserIdAndTagId(data.userId, data.tagId);

        if (userTag) {
            throw new ConflictException('Already exists an user tag with this user id and tag id!');
        }

        return this.repository.create(data);
    }

    async delete(data: UserTagCreateServiceDto): Promise<void> {
        await this.repository.delete(data);
    }
}

export default UserTagService;