import NotFoundException from "../exceptions/not-found-exception";
import ResetPasswordReqeustRepository from "../repositories/reset-password-request-repository";
import { ResetPasswordRequestCreateDto } from "../types/reset-password-request-types";

class ResetPasswordRequestService {
    private repository: ResetPasswordReqeustRepository;

    constructor(repository: ResetPasswordReqeustRepository) {
        this.repository = repository;
    }

    async create(data: ResetPasswordRequestCreateDto) {
        return this.repository.save(data);
    }

    async getById(id: string) {
        const resetPasswordRequest = await this.repository.findById(id);

        if (!resetPasswordRequest) {
            throw new NotFoundException(`There is no reset password request with this id!`);
        }

        return resetPasswordRequest;
    }

    async getByToken(token: string) {
        const resetPasswordRequest = await this.repository.findByToken(token);

        if (!resetPasswordRequest) {
            throw new NotFoundException(`There is no reset password request with this token!`);
        }

        return resetPasswordRequest;
    }

    async existsByToken(token: string) {
        const resetPasswordRequest = await this.repository.findByToken(token);
        return !!resetPasswordRequest;
    }

    async deleteAllByUserId(userId: string) {
        return this.repository.deleteAllByUserId(userId);
    }
}

export default ResetPasswordRequestService;