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
 * @param {Object} payment
 */
PayPal.prototype.createPayment = function (payment) {
    var future = new Future();

    sdk.payment.create(payment, function (error, payment) {
        future.return({
            error: error ? error : false,
            payment: payment ? payment : null
        });
    });

    return future.wait();
};

/**
 * {@link https://developer.paypal.com/docs/api/#execute-an-approved-paypal-payment}
 * @param {Object} payment
 */
PayPal.prototype.executePayment = function (payment) {
    var future = new Future();

    sdk.payment.execute(payment, function (error, payment) {
        future.return({
            error: error ? error : false,
            payment: payment ? payment : null
        });
    });

    return future.wait();
};

/**
 *
 * @param {Object} card
 * @param {Object[]} transactions
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
