import UserMapper from "./user-mapper";
import { PendingMember } from "@prisma/client";
import { MemberRepoDto } from "../types/member-types";

class MemberMapper {
    public static repoToService(member: MemberRepoDto) {
        return UserMapper.repoToService(member.user);
    }

    public static pendingMemberToCreateServiceDto(pendingMember: PendingMember) {
        const { id, token, createdAt, ...rest } = pendingMember;
        return rest;
    }
}

export default MemberMapper;