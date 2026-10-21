class ErrorUtils {
    static isSystemError(error: unknown): error is NodeJS.ErrnoException {
        return error instanceof Error && 'code' in error;
    }
}

export default ErrorUtils;