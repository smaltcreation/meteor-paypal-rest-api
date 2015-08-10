var sdk = Npm.require('paypal-rest-sdk');

// https://developer.paypal.com/docs/api/#payment-object
Payment = function (details, callback) {
    this.details = details;
    this.callback = callback;
};

Payment.prototype.create = function () {
    var self = this;

    sdk.payment.create(this.details, function (error, payment) {
        if (self.callback) {
            self.callback(error, payment);
        }
    });
};

Payment.prototype.execute = function () {
    var self = this;

    sdk.payment.execute(this.details, function (error, payment) {
        if (self.callback) {
            self.callback(error, payment);
        }
    });
};
