/**
 * @param email
 * @constructor
 */
BillingInfo = function (email) {
    this.email = email;
    this.language = 'en_GB';
};

/**
 * @param card
 * @returns {BillingInfo}
 */
BillingInfo.prototype.setCardInfo = function (card) {
    this.first_name = card.first_name;
    this.last_name = card.last_name;

    return this;
};
