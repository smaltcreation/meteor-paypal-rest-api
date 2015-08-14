var sdk = Npm.require('paypal-rest-sdk');
var Future = Npm.require('fibers/future');

/**
 * @param {string} intent
 * @param {Object} payer
 * @param {Object[]} transactions
 * @param {Object} redirect_urls
 * @constructor
 */
Payment = function (intent, payer, transactions, redirect_urls) {
    this.intent = intent;
    this.payer = payer;
    this.transactions = transactions;
    this.redirect_urls = redirect_urls;
};

/**
 * {@link https://developer.paypal.com/docs/api/#create-a-payment}
 */
Payment.prototype.create = function () {
    var future = new Future();

    sdk.payment.create(this, function (error, payment) {
        future.return({
            error: error ? error : false,
            payment: payment ? payment : null
        });
    });

    return future.wait();
};
