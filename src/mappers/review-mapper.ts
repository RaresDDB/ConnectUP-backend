import MemberMapper from "./member-mapper";
import { ReviewDetailsRepoDto } from "../types/review-types";

class ReviewMapper {
    public static repoToService(review: ReviewDetailsRepoDto) {
        const { memberId, member, ...rest } = review;

        return {
            ...rest,
            member: MemberMapper.repoToService(member)
        };
    }
}

export default ReviewMapper;