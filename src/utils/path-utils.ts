import path from "path"

class PathUtils {
    static getFilePath(fileName: string): string {
        return path.join(__dirname, '..', 'files', fileName);
    }
}

export default PathUtils;