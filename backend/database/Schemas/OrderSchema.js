const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    address: [{
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            },
            qunatity: Number,
            priceAtPurchase: Number,
            seller: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],

    orderStatus: {
        type: String,
        enum: ['placed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled']
    },
    paymentStatus: {
        type: String,
        enum: [
            'pending',      // order created, payment not attempted yet
            'paid',         // payment successful
            'failed',       // payment attempt failed
            'refunded',     // full refund issued
            'cancelled'     // order cancelled before payment or after failure
        ]
    }

})

const order = mongoose.model('Order', OrderSchema);
module.exports = order