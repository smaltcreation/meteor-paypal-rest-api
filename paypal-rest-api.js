var _ = Npm.require('underscore');

Smalt = _.extend(Smalt || {}, {
    PayPal: {
        /**
         * See prototype configure() of SDK.
         * @param config
         * @param callback
         */
        configure: function (config, callback) {
            var sdk = new SDK(_.extendOwn(SDK_CONFIG, config), callback);
            sdk.configure();
        },

        /**
         * See prototype create() of Payment.
         * @param details
         * @param callback
         */
        createPayment: function (details, callback) {
            var payment = new Payment(_.extendOwn(PAYMENT_DETAILS, details), callback);
            payment.create();
        },

        /**
         * See prototype execute() of Payment.
         * @param details
         * @param callback
         */
        executePayment: function (details, callback) {
            var payment = new Payment(_.extendOwn(PAYMENT_EXECUTION, details), callback);
            payment.execute();
        }
    }
});
