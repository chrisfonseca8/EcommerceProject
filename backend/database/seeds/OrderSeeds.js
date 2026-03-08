const mongoose = require("mongoose");
const { userIds } = require("./userSeeds");
const { itemIds } = require("./ItemSeeds");

module.exports.orderData = [

{
customer:userIds.rahulId,

address:{
phone:"9876543210",
addressLine1:"221 MG Road",
addressLine2:"Near Metro",
city:"Bangalore",
state:"Karnataka",
postalCode:"560001",
country:"India"
},

order:[
{
product:itemIds.item1,
quantity:2,
priceAtPurchase:799,
seller:userIds.sellerOneId
},
{
product:itemIds.item2,
quantity:1,
priceAtPurchase:1999,
seller:userIds.sellerOneId
}
],

orderStatus:"placed",
paymentStatus:"pending"
},

{
customer:userIds.priyaId,

address:{
phone:"9123456780",
addressLine1:"45 Park Street",
addressLine2:"",
city:"Mumbai",
state:"Maharashtra",
postalCode:"400001",
country:"India"
},

order:[
{
product:itemIds.item3,
quantity:1,
priceAtPurchase:1499,
seller:userIds.sellerTwoId
}
],

orderStatus:"shipped",
paymentStatus:"paid"
},

{
customer:userIds.arjunId,

address:{
phone:"9988776655",
addressLine1:"12 Lake View Apartments",
addressLine2:"HSR Layout",
city:"Bangalore",
state:"Karnataka",
postalCode:"560102",
country:"India"
},

order:[
{
product:itemIds.item5,
quantity:3,
priceAtPurchase:599,
seller:userIds.sellerOneId
},
{
product:itemIds.item6,
quantity:2,
priceAtPurchase:399,
seller:userIds.sellerTwoId
}
],

orderStatus:"delivered",
paymentStatus:"paid"
}

];