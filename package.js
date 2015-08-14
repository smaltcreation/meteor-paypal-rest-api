Package.describe({
    name: 'smaltcreation:paypal-rest-api',
    version: '0.1.0',
    summary: 'Meteor package for PayPal REST API.',
    git: 'https://github.com/SmaltCreation/meteor-paypal-rest-api',
    documentation: 'README.md'
});

Npm.depends({
    'paypal-rest-sdk': '1.6.0',
    'underscore': '1.8.3',
    'bootstrap': '3.3.5',
    'font-awesome': '4.4.0'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');

    /**
     * Used in BOTH side.
     * CLIENT, SERVER.
     */
    api.use([
        'tap:i18n@1.5.1'
    ], ['client', 'server']);
    api.addFiles([
        'package-tap.i18n',
        'lib/payment/form.js'
    ], ['client', 'server'] );

    /**
     * Used in CLIENT side.
     */
    api.use([
        'templating'
    ], 'client');
    api.addFiles([,
        'client/payment/payer/funding_instruments/credit_card/amount.html',
        'client/payment/payer/funding_instruments/credit_card/button.html',
        'client/payment/payer/funding_instruments/credit_card/result.html',
        'client/payment/payer/funding_instruments/credit_card/result.js',
        'client/payment/payer/funding_instruments/credit_card.html',
        'client/payment/payer/funding_instruments/credit_card.js'
    ], 'client');

    /**
     * Internalization i18n.
     * Need to be add after templates.
     */
    api.addFiles([
        "i18n/en.i18n.json",
        "i18n/fr.i18n.json"
    ], ["client", "server"]);

    /**
     * Used in SERVER side.
     */
    api.addFiles([
        'server/payment.js',
        'server/paypal.js',
        'paypal-rest-api.js'
    ], 'server');


    /**
     * Exports of Smalt objects.
     * Meteor should implement nested object exportation.
     * Example:
     *  { Smalt: {
     *      objectName: 'Smalt',
     *      client: true,
     *      server: true
     *      PayPal: {
     *          objectName: 'PayPal',
     *          client: false,
     *          server: true
     *      },
     *      PaymentForm: {
     *          objectName: 'PaymentForm',
     *          client: true,
     *          server: true
     *      }
     *  }
     */
    api.export('PaymentForm', ['client', 'server']);
    api.export('Smalt', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('smaltcreation:paypal-rest-api');
    api.addFiles('paypal-rest-api-tests.js');
});
