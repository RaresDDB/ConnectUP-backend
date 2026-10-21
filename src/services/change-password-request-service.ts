import NotFoundException from "../exceptions/not-found-exception";
import ChangePasswordRequestRepository from "../repositories/change-password-request.repository";
import { ChangePasswordRequestCreateDto } from "../types/change-password-request-types";

class ChangePasswordRequestService {
    private repository: ChangePasswordRequestRepository;

    constructor(repository: ChangePasswordRequestRepository) {
        this.repository = repository;
    }

    async create(data: ChangePasswordRequestCreateDto) {
        return this.repository.save(data);
    }

    async getById(id: string) {
        const changePasswordRequest = await this.repository.findById(id);

        if (!changePasswordRequest) {
            throw new NotFoundException(`There is no password change request with this id!`);
        }

        return changePasswordRequest;
    }

    async getByToken(token: string) {
        const changePasswordRequest = await this.repository.findByToken(token);

        if (!changePasswordRequest) {
            throw new NotFoundException(`There is no password change request with this token!`);
        }

        return changePasswordRequest;
    }

    async resolve(id: string) {
        const changePasswordRequest = await this.repository.findById(id);

        if (!changePasswordRequest) {
            throw new NotFoundException(`There is no password change request with this id!`);
        }

        if (changePasswordRequest.resolvedAt) {
            throw new NotFoundException(`This password change request has already been resolved!`);
        }

        return this.repository.patchById(id, {
            resolvedAt: new Date()
        });
    }

    async existsByToken(token: string) {
        return this.repository.existsByToken(token);
    }

    async deleteAllByUserId(userId: string) {
        return this.repository.deleteAllByUserId(userId);
    }
}

export default ChangePasswordRequestService;