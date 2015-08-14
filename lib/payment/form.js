/**
 * @type {{id: string, buttonId: string, getCreditCard: Function}}
 */
PaymentForm = {
    id: 'smalt-paypal-cc-form',
    buttonId: 'smalt-paypal-cc-form-button',
    getCreditCard: function (id) {
        var form = $('#' + (id ? id : this.id));
        var fields = form.serializeArray();
        var card = {};
        fields.forEach(function (field) {
            card[field.name] = field.value;
        });

        return card;
    }
};
