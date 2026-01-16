const crypto = require('crypto');

class PayUService {
    constructor() {
        this.merchantKey = process.env.PAYU_MERCHANT_KEY;
        this.merchantSalt = process.env.PAYU_MERCHANT_SALT;
        this.baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://secure.payu.in'
            : 'https://test.payu.in';
    }

    /**
     * Generate hash for payment request
     * Hash Sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|...|udf10|salt
     */
    generatePaymentHash(data) {
        const { txnid, amount, productinfo, firstname, email } = data;

        const hashString = `${this.merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${this.merchantSalt}`;

        return crypto.createHash('sha512').update(hashString).digest('hex');
    }

    /**
     * Verify response hash from PayU
     * Hash Sequence: salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
     */
    verifyResponseHash(data) {
        const { status, txnid, amount, productinfo, firstname, email, key, hash } = data;

        const hashString = `${this.merchantSalt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

        const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

        return calculatedHash === hash;
    }

    /**
     * Create payment request payload
     */
    createPaymentRequest(data) {
        const { txnid, amount, productinfo, firstname, email, phone, surl, furl } = data;

        const hash = this.generatePaymentHash({
            txnid,
            amount,
            productinfo,
            firstname,
            email
        });

        return {
            key: this.merchantKey,
            txnid,
            amount,
            productinfo,
            firstname,
            email,
            phone,
            surl, // Success URL
            furl, // Failure URL
            hash,
            service_provider: 'payu_paisa'
        };
    }
}

module.exports = new PayUService();
