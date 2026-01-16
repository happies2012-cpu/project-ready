const express = require('express');
const router = express.Router();
const stripeService = require('../services/stripeService');
const prisma = require('../db/prisma');

// Stripe webhook handler
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripeService.verifyWebhookSignature(req.body, sig);

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;

                // Update payment status
                await prisma.payment.updateMany({
                    where: { gatewayPaymentId: paymentIntent.id },
                    data: { status: 'completed' }
                });

                console.log('Payment succeeded:', paymentIntent.id);
                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;

                await prisma.payment.updateMany({
                    where: { gatewayPaymentId: failedPayment.id },
                    data: { status: 'failed' }
                });

                console.log('Payment failed:', failedPayment.id);
                break;

            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = event.data.object;

                // Update or create subscription
                await prisma.subscription.upsert({
                    where: { gatewaySubId: subscription.id },
                    update: {
                        status: subscription.status,
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
                    },
                    create: {
                        userId: subscription.metadata.userId,
                        userName: subscription.metadata.userName,
                        userEmail: subscription.metadata.userEmail,
                        plan: subscription.metadata.plan,
                        status: subscription.status,
                        amount: subscription.items.data[0].price.unit_amount / 100,
                        currency: subscription.currency.toUpperCase(),
                        interval: subscription.items.data[0].price.recurring.interval,
                        gateway: 'stripe',
                        gatewaySubId: subscription.id,
                        gatewayCustomerId: subscription.customer,
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
                    }
                });

                console.log('Subscription updated:', subscription.id);
                break;

            case 'customer.subscription.deleted':
                const deletedSub = event.data.object;

                await prisma.subscription.updateMany({
                    where: { gatewaySubId: deletedSub.id },
                    data: { status: 'cancelled' }
                });

                console.log('Subscription cancelled:', deletedSub.id);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).json({ error: 'Webhook error' });
    }
});

module.exports = router;
