Template.smaltPayPalCreditCardForm.onCreated(function () {
    if (!this.data.id) {
        this.data.id =  PaymentForm.id
    }
});

Template.smaltPayPalCreditCardForm.helpers({
    cards: function () {
        return [{
            value: 'amex',
            classes: 'amex',
            isSelected: false,
            text: 'American Express'
        }, {
            value: 'discover',
            classes: 'discover',
            isSelected: false,
            text: 'Discover'
        }, {
            value: 'mastercard',
            classes: 'mastercard',
            isSelected: false,
            text: 'MasterCard'
        }, {
            value: 'visa',
            classes: 'visa',
            isSelected: true,
            text: 'Visa'
        }];
    },
    months: function () {
        var months = [];
        for (var i = 1; i <= 12; i ++) {
            months.push({
                value: i,
                text: __('dates.months.' + i)
            })
        }
        return months;
    },
    thisYear: new Date().getFullYear() + 1
});
