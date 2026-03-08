const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    ItemName: String,
    price: Number,
    description: String,
    images: [String],
    sizes: [{
       size:{
            type: String,
            enum: ['S', 'M', 'L', 'XL', 'XXL']
        },
        stock:Number
    }
    ],


    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gender: {
        type: String,
        enum: ['Men', 'Woman', 'Kids']
    },
    category: {
        type: String,
        enum: ['TopWear','BottomWear', 'innerWear']
    }


})


const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;