const mongoose = require('mongoose');
const UserModel = require('../Schemas/UserSchema');
const { userData } = require('./userSeeds');
//console.log(userData);
const { itemData } = require('./ItemSeeds');
const itemModel = require('../Schemas/ItemsSchema');
//console.log(itemData);

const { orderData } = require('./OrderSeeds');
const orderModel = require('../Schemas/OrderSchema');
//console.log(orderData);

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
    .then(() => {
        console.log("mongoose Connection secured");
    })
    .catch((err) => {
        console.log(" mongoose Connection failed:", err);
    });

const addingUserSeeds = async () => {
    await UserModel.deleteMany({});
    try {
        const addedData = await UserModel.insertMany(userData);
        console.log(addedData);
    } catch (error) {
        console.log(error);
    }

}
addingUserSeeds()

const addingItemDSeeds = async () => {
    await itemModel.deleteMany({});
    try {
        const addedData = await itemModel.insertMany(itemData);
        console.log(addedData);
    } catch (error) {
        console.log(error);
    }
}

  addingItemDSeeds()


const addingOrderSeeds = async () => {
    await orderModel.deleteMany({});
    try {
        const addedData = await orderModel.insertMany(orderData);
        console.log(addedData);
    } catch (error) {
        console.log(error);
    }
}

addingOrderSeeds();
