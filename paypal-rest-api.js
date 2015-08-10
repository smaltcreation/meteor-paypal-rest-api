//http://underscorejs.org/
var _ = Npm.require('underscore');

// https://developer.paypal.com/docs/api/#payments
Smalt = _.extend(Smalt || {}, {
    PayPal: {
        //https://developer.paypal.com/docs/api/#oauth-request--response
        configure: function (config, callback) {
            var paypal = new SDK(_.extendOwn(PAYPAL_CONFIG, config), callback);
            paypal.configure();
        },
        // https://developer.paypal.com/docs/api/#create-a-payment
        createPayment: function (details, callback) {
            var payment = new Payment(_.extendOwn(PAYMENT_DETAILS, details), callback);
            payment.create();
        },
        // https://developer.paypal.com/docs/api/#execute-an-approved-paypal-payment
        executePayment: function (details, callback) {
            var payment = new Payment(_.extendOwn(PAYMENT_EXECUTION, details), callback);
            payment.execute();
        }
    }
});
