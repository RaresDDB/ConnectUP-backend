import TagService from "./tag-service";
import UserMapper from "../mappers/user-mapper";
import RoleService from "./role-service";
import PasswordUtils from "../utils/password-utils";
import UserTagService from "./user-tag-service";
import UserRepository from "../repositories/user-repository";
import NotFoundException from "../exceptions/not-found-exception";
import ConflictException from "../exceptions/conflict-exception";
import { UserConstants } from "../constants/user-constants";

class UserService {
    private tagService: TagService;
    private roleService: RoleService;
    private userTagService: UserTagService;
    private repository: UserRepository;

    constructor(
        tagService: TagService,
        roleService: RoleService,
        userTagService: UserTagService,
        repository: UserRepository
    ) {
        this.tagService = tagService;
        this.roleService = roleService;
        this.userTagService = userTagService;
        this.repository = repository;
    }

    // TODO modify any
    async create(data: any, encryptPassword: boolean = true) {
        const user = await this.repository.findByEmail(data.email);

        if (user) {
            throw new ConflictException(UserConstants.ALREADY_EXISTS_BY_EMAIL);
        }

        if (encryptPassword) {
            data.password = await PasswordUtils.hashPassword(data.password);
        }

        const { role, ...rest } = data;

        const createdRole = await this.roleService.gerOrCreate({ name: role });

        const createdUser = await this.repository.create({
            ...rest,
            roleId: createdRole.id,
        });

        return {
            ...createdUser,
            role: createdRole
        };
    }

    async getDtoByEmail(email: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new ConflictException(UserConstants.NOT_FOUND_BY_EMAIL);
        }

        return UserMapper.repoToService(user);
    }

    async getModelById(id: string) {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_ID);
        }

        return user;
    }

    async getModelByEmail(email: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_EMAIL);
        }

        return user;
    }

    async existsByEmail(email: string) {
        const user = await this.repository.findByEmail(email);
        return !!user;
    }

    // TODO modify any
    async updateById(id: string, data: any) {
        const { tags, ...rest } = data;

        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_ID);
        }

        const updatedUser = await this.repository.updateById(
            id,
            {
                ...rest,
                avatarUri: data.avatarUri ? data.avatarUri : user.avatarUri
            }
        );

        const existingTagIds = user.userTags.map(userTag => userTag.tag.id);

        const updatedTags = [];
        for (const tagName of tags) {
            const tag = await this.tagService.gerOrCreate({ name: tagName });
            updatedTags.push(tag);
        }

        const updatedTagIds = updatedTags.map(tag => tag.id);

        const tagsToRemove = user.userTags
            .filter(ut => !updatedTagIds.includes(ut.tag.id))
            .map(ut => ut.tag.id);

        const tagsToAdd = updatedTags
            .filter(tag => !existingTagIds.includes(tag.id))
            .map(tag => tag.id);

        for (const tagId of tagsToRemove) {
            await this.userTagService.delete({ userId: id, tagId });
        }

        for (const tagId of tagsToAdd) {
            await this.userTagService.create({ userId: id, tagId });
        }

        return UserMapper.repoToService(updatedUser);
    }

    async updateEmailById(id: string, email: string) {
        const existsById = await this.repository.existsById(id);

        if (!existsById) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_ID);
        }

        const existsByEmail = await this.repository.existsByEmail(email);

        if (existsByEmail) {
            throw new ConflictException(UserConstants.ALREADY_EXISTS_BY_EMAIL);
        }

        return this.repository.patchById(id, { email });
    }

    async updatePasswordById(id: string, password: string) {
        const existsById = await this.repository.existsById(id);

        if (!existsById) {
            throw new NotFoundException(UserConstants.NOT_FOUND_BY_ID);
        }

        return this.repository.patchById(id, { password });
    }
}

export default UserService;
