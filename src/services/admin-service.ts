import UserService from "./user-service";
import AdminRepository from "../repositories/admin-repository";
import NotFoundException from "../exceptions/not-found-exception";
import { Role } from "../enums/role-enum";
import { AdminCreateServiceDto } from "../types/admin-types";
import TagService from "./tag-service";
import UserTagService from "./user-tag-service";

class AdminService {
    private tagService: TagService;
    private userService: UserService;
    private userTagService: UserTagService;
    private repository: AdminRepository;

    constructor(
        tagService: TagService,
        userService: UserService,
        userTagService: UserTagService,
        repository: AdminRepository
    ) {
        this.tagService = tagService;
        this.userService = userService;
        this.userTagService = userTagService;
        this.repository = repository;
    }

    async create(data: AdminCreateServiceDto) {
        const { tags, ...userData } = data;
        
        const createdUser = await this.userService.create({ ...userData, role: Role.Admin }, true);
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

    async getById(id: string) {
        const admin = await this.repository.findById(id);

        if (!admin) {
           throw new NotFoundException('Admin not found');
        }

        return admin;
    }

    async existsByEmail(email: string) {
        const admin = await this.repository.findByEmail(email);
        return !!admin;
    }
}

export default AdminService;
