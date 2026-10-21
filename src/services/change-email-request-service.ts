import NotFoundException from "../exceptions/not-found-exception";
import ChangeEmailRequestRepository from "../repositories/change-email-request-repository";
import {
    ChangeEmailRequestCreateDto,
    ChangeEmailRequestPatchByIdServiceDto
} from "../types/change-email-request-types";

class ChangeEmailRequestService {
    private repository: ChangeEmailRequestRepository;

    constructor(repository: ChangeEmailRequestRepository) {
        this.repository = repository;
    }

    async create(data: ChangeEmailRequestCreateDto) {
        return this.repository.save(data);
    }

    async getById(id: string) {
        const changeEmailRequest = await this.repository.findById(id);

        if (!changeEmailRequest) {
            throw new NotFoundException(`There is no email change request with this id!`);
        }

        return changeEmailRequest;
    }

    async getByToken(token: string) {
        const changeEmailRequest = await this.repository.findByToken(token);

        if (!changeEmailRequest) {
            throw new NotFoundException(`There is no email change request with this token!`);
        }

        return changeEmailRequest;
    }

    async resolve(id: string) {
        const changeEmailRequest = await this.repository.findById(id);

        if (!changeEmailRequest) {
            throw new NotFoundException(`There is no email change request with this id!`);
        }

        if (changeEmailRequest.resolvedAt) {
            throw new NotFoundException(`This email change request has already been resolved!`);
        }

        return this.repository.patchById(id, { resolvedAt: new Date() });
    }

    async patchById(id: string, data: ChangeEmailRequestPatchByIdServiceDto) {
        const changeEmailRequest = await this.repository.findById(id);

        if (!changeEmailRequest) {
            throw new NotFoundException(`There is no email change request with this id!`);
        }

        return this.repository.patchById(id, data);
    }

    async existsByToken(token: string) {
        return this.repository.existsByToken(token);
    }

    async deleteAllByUserId(userId: string) {
        return this.repository.deleteAllByUserId(userId);
    }
}

export default ChangeEmailRequestService;