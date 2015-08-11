var sdk = Npm.require('paypal-rest-sdk');

/**
 * Object needed to configure the SDK.
 * @type {{host: string, client_id: null, client_secret: null}}
 */
SDK_CONFIG = {
    host: 'api.sandbox.paypal.com',
    client_id: null,
    client_secret: null
};

/**
 * Constructor
 * @param config
 * @param callback
 * @constructor
 */
SDK = function (config, callback) {
    this.config = config;
    this.callback = callback;
};

/**
 * {@link https://developer.paypal.com/docs/api/#oauth-request--response}
 */
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
