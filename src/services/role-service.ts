import RoleRepository from "../repositories/role-repository";
import NotFoundException from "../exceptions/not-found-exception";
import { RoleGetOrCreateDto } from "../types/role-types";

class RoleService {
    private repository: RoleRepository;

    constructor(repository: RoleRepository) {
        this.repository = repository;
    }

    async getById(id: string) {
        const role = await this.repository.findById(id);

        if (!role) {
            throw new NotFoundException(`There is no role with this id!`);
        }

        return role;
    }

    async gerOrCreate(data: RoleGetOrCreateDto) {
        const role = await this.repository.findByName(data.name);

        if (role) {
            return role;
        }

        return this.repository.create(data);;
    }
}

export default RoleService;