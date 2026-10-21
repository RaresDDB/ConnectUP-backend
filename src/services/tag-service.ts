import NotFoundException from "../exceptions/not-found-exception";
import TagRepository from "../repositories/tag-repository";
import {
    TagGetOrCreateDto,
    TagCreateServiceDto
} from "../types/tag-types";

class TagService {
    private repository: TagRepository;

    constructor(repository: TagRepository) {
        this.repository = repository;
    }

    async create(data: TagCreateServiceDto) {
        return this.repository.create(data);
    }

    async gerOrCreate(data: TagGetOrCreateDto) {
        const tag = await this.repository.findByName(data.name);

        if (tag) {
            return tag;
        }

        return this.repository.create(data);
    }

    async existsByName(name: string) {
        const tag = await this.repository.findByName(name);
        return !!tag;
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: string) {
        const tag = await this.repository.findById(id);

        if (!tag) {
            throw new NotFoundException('Tag not found');
        }

        return tag;
    }
}

export default TagService;