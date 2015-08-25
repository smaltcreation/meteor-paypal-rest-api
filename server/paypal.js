var sdk = Npm.require('paypal-rest-sdk');
var Future = Npm.require('fibers/future');

PayPal = function () {
    this.config = null;
};

/**
 * {@link https://developer.paypal.com/docs/api/#oauth-request--response}
 * @param {Object} config
 * @param callback
 */
PayPal.prototype.configure = function (config, callback) {
    this.config = config;

    sdk.configure({
        'host': this.config.host,
        'client_id': this.config.client_id,
        'client_secret': this.config.client_secret
    });

    sdk.generate_token(function (error, token) {
        if (callback) {
            callback(error, token);
        } else if (error) {
            console.log(error);
        }
    });
};

/**
 * @param card
 * @param transactions
 * @returns {payment|error}
 */
PayPal.prototype.createCardPayment = function (card, transactions) {
    var payer = {
        payment_method: 'credit_card',
        funding_instruments: [{
            credit_card: card
        }]
    };
    var payment = new Payment('sale', payer, transactions, null);
    var result = payment.create();

    if (result.error) {
        throw result.error;
    }

    return result.payment;
};

/**
 * @param payment
 * @param email
 * @returns {Array|error}
 */
PayPal.prototype.createInvoiceFromPayment = function (payment, email) {
    var self = this;

    var invoices = [];
    payment.transactions.forEach(function (transaction) {

        if (transaction.items == undefined) {
            throw new Error('Missing array of "items" in "transaction" object from "payment.')
        }

        var total_amount = {
            currency: transaction.amount.currency,
            value:  transaction.amount.total
        };

        var invoice = new Invoice(self.config.info, [new BillingInfo(email)], transaction.items, total_amount);
        var result = invoice.create();

        if (result.error) {
            throw result.error;
        }

        var payment_attr = {
            method: payment.payer.payment_method.toUpperCase(),
            note: 'Transaction received.'
        };
        result.invoice.rv = [
            invoice.recordPayment(result.invoice, payment_attr)
        ];

        invoices.push(result.invoice);
    });

    return invoices;
};
