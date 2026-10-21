import stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import PaymentValidator from '../../validators/payment-validator';

class PaymentController {
    create = asyncHandler(async (req, res) => {
        if (!process.env.STRIPE_API_KEY) {
            res.status(500).json({
                message: 'Stripe API key is missing!'
            });
            return;
        }

        const stripeInstance = new stripe(process.env.STRIPE_API_KEY);

        const requestPayload = PaymentValidator.validateCreatePaymentIntent(req.body);

        const paymentIntent = await stripeInstance.paymentIntents.create(requestPayload);

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    });
}

export default PaymentController;