const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const crypto = require('crypto');

const memberSchema = mongoose.Schema({
       firstName:{
        type: String,
        required: true,
        trim: true
      },
      lastName:{
        type: String,
        trim: true
      },
      fullName:{
        type: String,
        trim: true
      },
      photo:{
        type:"String",
        default:"https://i.stack.imgur.com/l60Hf.png"
      },
      email:{
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      contactNumber:{
        type: String,
        trim: true
      },
      designation:{
        type:ObjectId,
        ref: "Designation"
      },
      department:{
        type:ObjectId,
        ref: "Department"
      },
      role:{
        type:String
      },
      isActive:{
        type: Boolean,
        required:true,
        default: true
      },
      hashed_password: {
        type: String,
        required: true
      },
      salt: String,
      resetPasswordLink: {
        data: String,
        default: ''
      },
},{ timestamps: true })


memberSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

memberSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};


module.exports = mongoose.model('Member', memberSchema);
