var sdk = Npm.require('paypal-rest-sdk');

SDK = function (config, callback) {
    this.config = config;
    this.callback = callback;
};

SDK.prototype.configure = function () {
    var self = this;

    sdk.configure({
        'host': self.config.host,
        'client_id': self.config.client_id,
        'client_secret': self.config.client_secret
    });

    sdk.generate_token(function (error, token) {
        if (self.callback) {
            self.callback(error, token);
        }
    });
};
