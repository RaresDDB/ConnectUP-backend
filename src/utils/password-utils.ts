import bcrypt from "bcrypt";

class PasswordUtils {
    public static readonly SALT_ROUNDS: number = 10;

    public static async hashPassword(password: string) {
        return await bcrypt.hash(password, PasswordUtils.SALT_ROUNDS);
    }

    public static async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    public static generatePassword() {
        return Math.random().toString(36).slice(-8);
    }
}

export default PasswordUtils;