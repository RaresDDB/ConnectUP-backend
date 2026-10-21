import BadRequestException from "../exceptions/bad-request-exception";
import { CreatePaymentIntent } from "../types/payment-types";

class PaymentValidator {
    public static validateCreatePaymentIntent(data: Record<string, any>): CreatePaymentIntent {
        const fields: string[] = ["amount"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            amount: parseInt(data.amount),
            currency: data.currency
        }
    }
}

export default PaymentValidator;