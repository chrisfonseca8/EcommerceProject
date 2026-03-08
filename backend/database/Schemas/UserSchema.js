const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String
  },

  role: {
    type: String,
    enum: ["Admin", "Seller", "Customer"],
    default: "Customer"
  },

  addresses: [
    {
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
    }
  ]
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const User = mongoose.model("User", UserSchema);

module.exports = User;