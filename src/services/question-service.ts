import EmailUtils from "../utils/email-utils";
import MemberService from "./member-service";
import QuestionMapper from "../mappers/question-mapper";
import NotFoundException from "../exceptions/not-found-exception";
import QuestionRepository from "../repositories/question-repository";
import { QuestionCreateServiceDto } from "../types/question-types";

class QuestionService {
    private memberService: MemberService;
    private repository: QuestionRepository;

    constructor(
        memberService: MemberService,
        repository: QuestionRepository
    ) {
        this.memberService = memberService;
        this.repository = repository;
    }

    async create(data: QuestionCreateServiceDto) {
        const { mentionedUsernames, ...rest } = data;

        const question = await this.repository.create(rest);

        for (const username of mentionedUsernames) {
            const member = await this.memberService.getByUsername(username);

            await EmailUtils.sendMentionEmail(
                member.email,
                rest.eventId
            );
        }

        return QuestionMapper.repoToService(question);
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: string) {
        const question = await this.repository.findById(id);

        if (!question) {
            throw new NotFoundException('Question not found');
        }

        return question;
    }
}

export default QuestionService;