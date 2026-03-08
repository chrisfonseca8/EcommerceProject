const mongoose = require("mongoose");
const { userIds } = require("./userSeeds");

const item1 = new mongoose.Types.ObjectId();
const item2 = new mongoose.Types.ObjectId();
const item3 = new mongoose.Types.ObjectId();
const item4 = new mongoose.Types.ObjectId();
const item5 = new mongoose.Types.ObjectId();
const item6 = new mongoose.Types.ObjectId();

module.exports.itemIds = {
  item1,
  item2,
  item3,
  item4,
  item5,
  item6
};

module.exports.itemData = [

{
  _id: item1,
  ItemName: "Classic White T-Shirt",
  price: 799,
  description: "Premium cotton white t-shirt.",
  images: [
    "https://picsum.photos/300",
    "https://picsum.photos/301",
    "https://picsum.photos/302"
  ],
  seller: userIds.sellerOneId,
  gender: "Men",
  category: "TopWear",
  sizes:[
    {size:"S",stock:10},
    {size:"M",stock:15},
    {size:"L",stock:12}
  ]
},

{
  _id: item2,
  ItemName: "Slim Fit Blue Jeans",
  price: 1999,
  description: "Slim fit denim jeans.",
  images: [
    "https://picsum.photos/303",
    "https://picsum.photos/304",
    "https://picsum.photos/305"
  ],
  seller: userIds.sellerOneId,
  gender: "Men",
  category: "BottomWear",
  sizes:[
    {size:"M",stock:8},
    {size:"L",stock:10},
    {size:"XL",stock:5}
  ]
},

{
  _id: item3,
  ItemName: "Floral Summer Top",
  price: 1499,
  description: "Light floral summer top.",
  images: [
    "https://picsum.photos/306",
    "https://picsum.photos/307",
    "https://picsum.photos/308"
  ],
  seller: userIds.sellerTwoId,
  gender: "Woman",
  category: "TopWear",
  sizes:[
    {size:"S",stock:7},
    {size:"M",stock:9},
    {size:"L",stock:6}
  ]
},

{
  _id: item4,
  ItemName: "Women's Cotton Leggings",
  price: 999,
  description: "Stretch cotton leggings.",
  images: [
    "https://picsum.photos/309",
    "https://picsum.photos/310",
    "https://picsum.photos/311"
  ],
  seller: userIds.sellerTwoId,
  gender: "Woman",
  category: "BottomWear",
  sizes:[
    {size:"S",stock:10},
    {size:"M",stock:12},
    {size:"L",stock:8}
  ]
},

{
  _id: item5,
  ItemName: "Kids Graphic T-Shirt",
  price: 599,
  description: "Printed kids t-shirt.",
  images: [
    "https://picsum.photos/312",
    "https://picsum.photos/313",
    "https://picsum.photos/314"
  ],
  seller: userIds.sellerOneId,
  gender: "Kids",
  category: "TopWear",
  sizes:[
    {size:"S",stock:15},
    {size:"M",stock:10}
  ]
},

{
  _id: item6,
  ItemName: "Men Inner Vest",
  price: 399,
  description: "Comfortable cotton vest.",
  images: [
    "https://picsum.photos/315",
    "https://picsum.photos/316",
    "https://picsum.photos/317"
  ],
  seller: userIds.sellerTwoId,
  gender: "Men",
  category: "innerWear",
  sizes:[
    {size:"M",stock:20},
    {size:"L",stock:18},
    {size:"XL",stock:10}
  ]
}

];