/**
 * {@link https://developer.paypal.com/docs/api/#invoiceitem-object}
 * @param quantity
 * @param name
 * @param unit_price
 * @constructor
 */
Item = function (quantity, name, unit_price) {
    this.quantity = quantity;
    this.name = name;
    this.unit_price = unit_price;
    this.total = this.unit_price.value * this.quantity;
    this.taxed = false;
    this.reduced = false;
};

Item.prototype.getTotal = function () {
    return Number(Math.round(this.total * 100) / 100).toFixed(2);
};

Item.prototype.setDescription = function (description) {
    this.description = description.length > 1000 ? description.substring(0,996) + '...' : description;
};

/**
 * {@link https://developer.paypal.com/docs/api/#tax-object}
 * @param tax
 * @param apply_tax
 * @returns {Item}
 */
Item.prototype.setTax = function (tax, apply_tax) {
    this.tax = tax;

    if (apply_tax) {
        if (_.has(tax, 'percent')) {
            this.total *= (1 + tax.percent / 100);
        } else if (_.has(tax, 'amount')) {
            this.total *= (1 + tax.amount.value / 100);
        }
        this.taxed = true;
    }

    return this;
};

/**
 * {@link https://developer.paypal.com/docs/api/#cost-object}
 * @param discount
 * @param apply_discount
 * @returns {Item}
 */
Item.prototype.setDiscount= function (discount, apply_discount) {
    this.discount = discount;

    if (apply_discount) {
        if (_.has(discount, 'percent')) {
            this.total *= (1 - discount.percent / 100);
        } else if (_.has(discount, 'amount')) {
            this.total *= (1 - discount.amount.value / 100);
        }
        this.reduced = true;
    }

    return this;
};
