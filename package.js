Package.describe({
    name: 'smalt:paypal-rest-api',
    version: '0.0.1',
    summary: 'Meteor package for PayPal REST API.',
    git: 'https://github.com/SmaltCreation/meteor-paypal-rest-api',
    documentation: 'README.md'
});

Npm.depends({
    'paypal-rest-sdk': '1.6.0',
    'underscore': '1.8.3'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');

    api.use([
        'templating'
    ], 'client');

    api.addFiles([
      'lib/server/paypal/config.js',
      'lib/server/payment/details.js',
      'lib/server/paypal.js',
      'lib/server/payment.js',
      'paypal-rest-api.js'
    ], 'server');

    api.export('Smalt', 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('smalt:paypal-rest-api');
    api.addFiles('paypal-rest-api-tests.js');
});
