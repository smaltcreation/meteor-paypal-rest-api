var _ = Npm.require('underscore');

/**
 * SERVER SIDE
 * @type {Smalt}
 */
Smalt = _.extend(Smalt || {}, {
    PayPal: new PayPal()
});
