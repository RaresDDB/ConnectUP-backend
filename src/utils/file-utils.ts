import ErrorUtils from "./error-utils";
import NotFoundException from "../exceptions/not-found-exception";
import ForbiddenException from "../exceptions/forbidden-exception";
import InternalServerException from "../exceptions/internal-server-exception";
import { promises } from "fs";

class FileUtils {
    static async readJsonFile<T>(filePath: string): Promise<T[]> {
        try {
            const data = await promises.readFile(filePath, 'utf8');
            return JSON.parse(data) as T[];
        }
        catch (error) {
            if (!ErrorUtils.isSystemError(error)) {
                throw new Error(`An unexpected error occurred!`);
            }

            if (error.code === 'ENOENT') {
                throw new NotFoundException(`File ${filePath} was not found!`);
            }

            if (error.code === 'EACCES') {
                throw new ForbiddenException(`Access denied for file ${filePath}!`);
            }

            throw new InternalServerException("Internal server error!");
        }
    }
}

export default FileUtils;