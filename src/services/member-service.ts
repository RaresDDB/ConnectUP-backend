import TagService from "./tag-service";
import UserService from "./user-service";
import MemberMapper from "../mappers/member-mapper";
import UserTagService from "./user-tag-service";
import MemberRepository from "../repositories/member-repository";
import { Role } from "../enums/role-enum";
import { MemberCreateServiceDto } from "../types/member-types";
import NotFoundException from "../exceptions/not-found-exception";

class MemberService {
    private tagService: TagService;
    private userService: UserService;
    private userTagService: UserTagService;
    private repository: MemberRepository;

    constructor(
        tagService: TagService,
        userService: UserService,
        userTagService: UserTagService,
        repository: MemberRepository
    ) {
        this.tagService = tagService;
        this.userService = userService;
        this.userTagService = userTagService;
        this.repository = repository;
    }

    async create(data: MemberCreateServiceDto) {
        const { tags, ...userData } = data;

        const createdUser = await this.userService.create({ ...userData, role: Role.Member }, false);

        await this.repository.create({ id: createdUser.id });

        const createdTags = [];

        if (tags && tags.length > 0) {
            for (const tag of tags) {
                const createdTag = await this.tagService.gerOrCreate({ name: tag });
                await this.userTagService.create({ userId: createdUser.id, tagId: createdTag.id });
                createdTags.push(createdTag);
            }
        }
    }

    async getAll() {
        const members = await this.repository.findAll();
        return members.map((member) => MemberMapper.repoToService(member));
    }

    async getById(id: string) {
        return this.repository.findById(id);
    }

    async getByUsername(username: string) {
        const member = await this.repository.findByUsername(username);

        if (!member) {
            throw new NotFoundException('Member not found');
        }

        return MemberMapper.repoToService(member);
    }
}

export default MemberService;
