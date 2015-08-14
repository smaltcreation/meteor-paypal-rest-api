# meteor-paypal-rest-api
Meteor package for PayPal REST API.

* Basic payments
* Credit card payments
* Adapted forms & templates

### Usage
``` console
meteor add smaltcreation:paypal-rest-api
```

## Configuration
If you haven't already, sign up for a developer account at: [https://developer.paypal.com/](https://developer.paypal.com/)
and create a sandbox application.

In your project, create a file `server/paypal.js` with your application configuration including:

``` javascript
Smalt.PayPal.configure({
  host: 'api.sandbox.paypal.com',
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_SECRET_KEY'
});
```

## Create a payment
### With a credit card
Proceed a payment with a credit card is a two steps work:

#### Client side
First, you should display the form template like this:

``` handlebars
{{> smaltPayPalCreditCardForm totalAmount=42 currency="€" tax="TTC"}}
```

You can provide several parameters for the template. Those three are required.
* ``totalAmount`` show the total price of your transaction
* ``currency`` €, $, £, wathever you want to display
* ``tax`` indicate if it's tax free or not
* ``id`` the #id of your form. Usefull if you have several form in the same page
* ``noButton`` true if you don't want to display the submit button

Then, you need to look for the event which validate the form like a click on a button or when the form is submited:

``` javascript
Template.smaltPayPalCreditCardForm.events({
    'submit form': function (event) {
      Meteor.call('youServerSideMethod', PaymentForm.getCreditCard(), function (error, result) {
        // Do wathever you want to do client side
        // like open a sweet alert with the result or the error
      });
    }
});
```
**All transactions must be validated server side with your methods !**
That's why: `Meteor.call('youServerSideMethod'...`

Note that `PaymentForm.getCreditCard()` returns an object with card's informations exported from our form.

#### Server side
Create a `server/methods/paypal.js` file when you are going to place all you logic.

It's a good practice to follow those steps:
* **Validations:** check if all your informations other than the credit card are good, like if the user is log in
* **Set up the amount:** if you need to do operation like apply taxes...
* **Call the package and create the payment** with the card and amount objects
* **Transmit errors or the result client side** if you need to

``` javascript
youServerSideMethod: function (card) {
  /**
   * Before calling the package, you need to make sure that your inputs are well submitted.
   * Remember : never trust user input.
   * That's why validations.
   */
  if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
  }

  // Then, set up the amount with your values.
  var transactions = [];
  transactions.push({
      amount: {
          total: 42,
          currency: EUR
      }
  });

  // Call the package to create the Payment
  try {
      var payment = Smalt.PayPal.createCardPayment(card, transactions);

      // Error are catched, so
      // YOUR PAYMENT SUCCEED
      // Do whatever you want like loging the payment
      // You can also return it to the client
      
      return payment;
  } catch (e) {
      console.log(e);
      throw new Meteor.Error('paypal');
  }
}
```

`var transactions = []` is an array of `amount` objects who require a `total` and a `currency`

*The package is gonna implement a function who automaticly treats those objects with user data.**

**And that's all you need to do for a complete credit card payment.**
