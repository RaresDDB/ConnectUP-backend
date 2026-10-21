import MemberMapper from "./member-mapper";
import { QuestionDetailsRepoDto } from "../types/question-types";

class QuestionMapper {
    public static repoToService(question: QuestionDetailsRepoDto) {
        const { memberId, member, ...rest } = question;

        return {
            ...rest,
            member: MemberMapper.repoToService(member)
        };
    }
}

export default QuestionMapper;