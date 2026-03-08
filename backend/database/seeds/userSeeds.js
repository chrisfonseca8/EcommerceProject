const mongoose = require("mongoose");

const adminId = new mongoose.Types.ObjectId();
const sellerOneId = new mongoose.Types.ObjectId();
const sellerTwoId = new mongoose.Types.ObjectId();
const rahulId = new mongoose.Types.ObjectId();
const priyaId = new mongoose.Types.ObjectId();
const arjunId = new mongoose.Types.ObjectId();

module.exports.userIds = {
  adminId,
  sellerOneId,
  sellerTwoId,
  rahulId,
  priyaId,
  arjunId
};

module.exports.userData = [
  {
    _id: adminId,
    username: "admin01",
    email: "admin@example.com",
    password: "admin123",
    role: "Admin"
  },

  {
    _id: sellerOneId,
    username: "sellerOne",
    email: "seller1@example.com",
    password: "seller123",
    role: "Seller"
  },

  {
    _id: sellerTwoId,
    username: "sellerTwo",
    email: "seller2@example.com",
    password: "seller123",
    role: "Seller"
  },

  {
    _id: rahulId,
    username: "rahul",
    email: "rahul@example.com",
    password: "customer123",
    role: "Customer"
  },

  {
    _id: priyaId,
    username: "priya",
    email: "priya@example.com",
    password: "customer123",
    role: "Customer"
  },

  {
    _id: arjunId,
    username: "arjun",
    email: "arjun@example.com",
    password: "customer123",
    role: "Customer"
  }
];