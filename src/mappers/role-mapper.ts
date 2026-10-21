import { Role } from "@prisma/client";

class RoleMapper {
    public static repoToService(role: Role) {
        return role;
    }
}

export default RoleMapper;