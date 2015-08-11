/**
 *  WE FOLLOW THE SAME LOGIC THAN PAYPAL INSTANCING ONLY ONE OBJECT
 *  FOR DIFFERENT PURPOSE WITH DIFFERENT ATTRIBUTES.
 */

var sdk = Npm.require('paypal-rest-sdk');

/**
 * Object needed to create a payment.
 * @type {{intent: string, payer: {}, transactions: Array, redirect_urls: {}}}
 */
PAYMENT_DETAILS = {
    intent: 'sale',
    payer: {},
    transactions: [],
    redirect_urls: {}
};

/**
 * Object needed to execute a payment.
 * @type {{payment_id: null, transactions: Array}}
 */
PAYMENT_EXECUTION = {
    payment_id: null,
    transactions: []
};

/**
 * Constructor
 * {@link https://developer.paypal.com/docs/api/#payment-object}
 * @param details
 * @param callback
 * @constructor
 */
Payment = function (details, callback) {
    this.details = details;
    this.callback = callback;
};

/**
 * {@link https://developer.paypal.com/docs/api/#create-a-payment}
 */
Payment.prototype.create = function () {
    var self = this;

    sdk.payment.create(this.details, function (error, payment) {
        if (self.callback) {
            self.callback(error, payment);
        }
    });
};

/**
 * {@link https://developer.paypal.com/docs/api/#execute-an-approved-paypal-payment}
 */
Payment.prototype.execute = function () {
    var self = this;

    sdk.payment.execute(this.details, function (error, payment) {
        if (self.callback) {
            self.callback(error, payment);
        }
    });
};
