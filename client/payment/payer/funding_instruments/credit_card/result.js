Template.smaltPayPalCreditCardResult.onCreated(function() {
    var result = this.data;

    this.data.firstName = result.payer.funding_instruments[0].credit_card.first_name;
    this.data.lastName = result.payer.funding_instruments[0].credit_card.last_name;
    this.data.cardNumber = result.payer.funding_instruments[0].credit_card.number;

    var totalAmount = 0;
    result.transactions.forEach(function (element) {
        totalAmount += element.amount.total;
    });
    this.data.totalAmount = totalAmount;
    this.data.currency = result.transactions[0].amount.currency;
});
