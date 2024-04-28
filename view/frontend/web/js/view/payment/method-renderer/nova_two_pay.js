/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default'
    ],
    function (Component) {
        'use strict'
        return Component.extend({
            defaults: {
                template: 'Magento_NovaTwoPay/payment/form',
                transactionResult: ''
            },

            initObservable: function () {

                this._super()
                    .observe([
                        'transactionResult'
                    ]);
                return this;
            },

            getCode: function() {
                return 'nova_two_pay';
            },

            getData: function() {
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'card_num': document.getElementById("nova-apiplus-card-number").value,
                        'card_expiry': document.getElementById("nova-apiplus-card-expiry").value,
                        'card_cvc': document.getElementById("nova-apiplus-card-cvc").value,
                    }
                };
            },

            setTransactionResult: function (transactionResult) {
                this.transactionResult = transactionResult;
            },

            beforePlaceOrder: function (data) {
                this.setTransactionResult(data.nonce);
                this.placeOrder();
            },

            getTransactionResults: function() {
                return _.map(window.checkoutConfig.payment.nova_two_pay.transactionResults, function(value, key) {
                    return {
                        'value': key,
                        'transaction_result': value
                    }
                });
            }
        });
    }
);