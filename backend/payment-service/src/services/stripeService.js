const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
exports.createPaymentIntent = async (amount, currency, metadata) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit
            currency: currency.toLowerCase(),
            metadata,
            automatic_payment_methods: {
                enabled: true
            }
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        };
    } catch (error) {
        console.error('Stripe create payment intent error:', error);
        throw error;
    }
};

// Confirm payment
exports.confirmPayment = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return paymentIntent;
    } catch (error) {
        console.error('Stripe confirm payment error:', error);
        throw error;
    }
};

// Create refund
exports.createRefund = async (paymentIntentId, amount) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined
        });

        return refund;
    } catch (error) {
        console.error('Stripe refund error:', error);
        throw error;
    }
};

// Create subscription
exports.createSubscription = async (customerId, priceId, metadata) => {
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            metadata,
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent']
        });

        return subscription;
    } catch (error) {
        console.error('Stripe create subscription error:', error);
        throw error;
    }
};

// Cancel subscription
exports.cancelSubscription = async (subscriptionId) => {
    try {
        const subscription = await stripe.subscriptions.cancel(subscriptionId);
        return subscription;
    } catch (error) {
        console.error('Stripe cancel subscription error:', error);
        throw error;
    }
};

// Create customer
exports.createCustomer = async (email, name, metadata) => {
    try {
        const customer = await stripe.customers.create({
            email,
            name,
            metadata
        });

        return customer;
    } catch (error) {
        console.error('Stripe create customer error:', error);
        throw error;
    }
};

// Verify webhook signature
exports.verifyWebhookSignature = (payload, signature) => {
    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        return event;
    } catch (error) {
        console.error('Stripe webhook verification error:', error);
        throw error;
    }
};
