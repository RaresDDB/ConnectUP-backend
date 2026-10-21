/**
 * Utility class for date-related operations
 */
class DateUtils {
    /**
     * Calculate age based on date of birth
     * @param dateOfBirth The date of birth
     * @returns The calculated age
     */
    static calculateAge(dateOfBirth: Date): number {
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDifference = today.getMonth() - dateOfBirth.getMonth();

        // If birthday hasn't occurred yet this year, subtract 1 from age
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }

        return age;
    }
}

export default DateUtils;