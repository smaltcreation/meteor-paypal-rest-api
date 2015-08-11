Package.describe({
    name: 'smalt:paypal-rest-api',
    version: '0.0.2',
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

    api.use([
        'tap:i18n@1.5.1'
    ], ['client', 'server']);

    api.addFiles([
        'package-tap.i18n'
    ], ['client', 'server'] );

    api.addFiles([
        'server/sdk.js',
        'server/payment.js',
        'paypal-rest-api.js'
    ], 'server');

    api.export('Smalt', 'server');

    api.use([
        'templating'
    ], 'client');

    api.addFiles([
        'client/payment/payer/funding_instruments/credit_card.html',
        'client/payment/payer/funding_instruments/credit_card.js',
        'client/payment/payer/funding_instruments/credit_card/amount.html'
    ], 'client');

    api.addFiles([
        "i18n/en.i18n.json",
        "i18n/fr.i18n.json"
    ], ["client", "server"]);
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('smalt:paypal-rest-api');
    api.addFiles('paypal-rest-api-tests.js');
});
