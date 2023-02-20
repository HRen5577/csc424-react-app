const mongoose = require("mongoose");
const crypto = require("crypto");


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        salt: {
            type: String,
            required: true,
            trim: true,
        },
        hash: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        }

    },
    {collection: "users_list"}
);

UserSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString("hex");
  
    // Hashing user's salt and password with 1000 iterations,
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  };
  
  // Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  
    return this.hash === hash;
  };

const User = mongoose.model("User",UserSchema);

module.exports = User;