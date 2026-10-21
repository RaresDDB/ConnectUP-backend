import JwtUtils from "../utils/jwt-utils";
import EmailUtils from "../utils/email-utils";
import UserService from "./user-service";
import PasswordUtils from "../utils/password-utils";
import ConflictException from "../exceptions/conflict-exception";
import NotFoundException from "../exceptions/not-found-exception";
import PendingMemberRepository from "../repositories/pending-member-repository";
import { PendingMemberCreateServiceDto } from "../types/pending-member-types";

class PendingMemberService {
    private userService: UserService;
    private repository: PendingMemberRepository;

    constructor(
        userService: UserService,
        repository: PendingMemberRepository
    ) {
        this.userService = userService;
        this.repository = repository;
    }

    async create(data: PendingMemberCreateServiceDto) {
        const userExists = await this.userService.existsByEmail(data.email);

        if (userExists) {
            throw new ConflictException("Already exists a user with this email!");
        }

        const pendingMember = await this.repository.findByEmail(data.email);

        if (pendingMember) {
            throw new ConflictException("Already exists a pending member with this email!");
        }

        data.password = await PasswordUtils.hashPassword(data.password);

        const token = JwtUtils.generateActivateToken(data.email);

        console.log(token);

        await EmailUtils.sendActivationEmail(data.email, token);

        return this.repository.create({
            ...data,
            token
        });
    }

    async getByToken(token: string) {
        const pendingMember = await this.repository.findByToken(token);

        if (!pendingMember) {
            throw new NotFoundException("There is no pending member with this token!")
        }

        return pendingMember;
    }

    async deleteById(id: string) {
        const pendingMember = await this.repository.findById(id);

        if (!pendingMember) {
            throw new NotFoundException("There is no pending member with this id!");
        }

        return this.repository.deleteById(id);
    }
}

export default PendingMemberService;
