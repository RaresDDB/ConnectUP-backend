import TagMapper from "./tag-mapper";
import RoleMapper from "./role-mapper";
import { UserRepoDto } from "../types/user-types";

class UserMapper {
    public static repoToService(user: UserRepoDto) {
        console.log(user);

        const { role, roleId, password, userTags, ...rest } = user;

        return {
            ...rest,
            role: RoleMapper.repoToService(role),
            tags: userTags?.map(({ tag }) => TagMapper.repoToService(tag))
        }
    }
}

export default UserMapper;