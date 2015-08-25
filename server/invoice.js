var sdk = Npm.require('paypal-rest-sdk');
var Future = Npm.require('fibers/future');

/**
 * {@link https://developer.paypal.com/docs/api/#invoicing}
 * @param merchant_info
 * @param billing_info
 * @param items
 * @constructor
 */
Invoice = function (merchant_info, billing_info, items) {
    this.merchant_info = merchant_info;
    this.billing_info = billing_info;
    this.items = items;
    this.tax_inclusive = true;
};

/**
 * {@link https://github.com/paypal/PayPal-node-SDK/blob/master/samples/invoice/create.js}
 */
Invoice.prototype.create = function () {
    var future = new Future();

    sdk.invoice.create(this, function (error, invoice) {
        future.return({
            error: error ? error : false,
            invoice: invoice ? invoice : null
        });
    });

    return future.wait();
};

/**
 * {@link https://github.com/paypal/PayPal-node-SDK/blob/master/samples/invoice/record_payment.js}
 */
Invoice.prototype.recordPayment = function (invoice, payment_attr) {
    var future = new Future();

    sdk.invoice.recordPayment(invoice.id, payment_attr, function (error, rv) {
        future.return({
            error: error ? error : false,
            rv: rv ? rv : null
        });
    });

    return future.wait();
};

/**
 * {@link https://github.com/paypal/PayPal-node-SDK/blob/master/samples/invoice/send.js}
 */
Invoice.prototype.send = function (invoice) {
    var future = new Future();

    sdk.invoice.send(invoice.id, function (error, rv) {
        future.return({
            error: error ? error : false,
            rv: rv ? rv : null
        });
    });

    return future.wait();
};

Invoice.prototype.addItem = function (item) {
    if(_.has(this.items)) {
        this.items.push(item);
    } else {
        this.items = [item];
    }
};
