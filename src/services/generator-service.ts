import FileUtils from "../utils/file-utils";
import PathUtils from "../utils/path-utils";
import TagService from "./tag-service";
import AdminService from "./admin-service";
import { TagCreateServiceDto } from "../types/tag-types";
import { AdminCreateServiceDto } from "../types/admin-types";

class GeneratorService {
    private tagService: TagService;
    private adminService: AdminService;

    constructor(
        tagService: TagService,
        adminService: AdminService
    ) {
        this.tagService = tagService;
        this.adminService = adminService;
    }

    async generateAll(): Promise<void> {
        await this.generateTags();
        await this.generateAdmins();
    }

    async generateTags(): Promise<number> {
        const tagsFilePath = PathUtils.getFilePath("tags.json");

        const tags = await FileUtils.readJsonFile<TagCreateServiceDto>(tagsFilePath);

        let count = 0;

        for (const tag of tags) {
            const existsTag = await this.tagService.existsByName(tag.name);

            if (!existsTag) {
                await this.tagService.create(tag);
                count++;
            }
        }

        return count;
    }

    async generateAdmins(): Promise<number> {
        const adminsFilePath = PathUtils.getFilePath("admins.json");

        const admins = await FileUtils.readJsonFile<AdminCreateServiceDto>(adminsFilePath);

        let count = 0;

        for (const admin of admins) {
            const existsAdmin = await this.adminService.existsByEmail(admin.email);

            if (!existsAdmin) {
                await this.adminService.create(admin);
                count++;
            }
        }

        return count;
    }
}

export default GeneratorService;