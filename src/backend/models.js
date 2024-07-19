const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const users_Schema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    address: { lng:{type:String,required:true},lat:{type:String,required:true} }
}
    , {
        timestamps: true,
    }
)
const users_Model = mongoose.model('users_Model', users_Schema)

const item_Schema = new mongoose.Schema({
    userId: { type: Number },
    mainTitle: { type: String, required: true },
    subTitle: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    pages: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity :{ type: Number, required: true },
    image : {type : String ,required:true},
    // img:{data:Buffer,contentType:String},
    id: { type: Number, required: true, unique: true }

}, {
    timestamps: true
})
const item_Model = mongoose.model('item_Model', item_Schema)


module.exports = {item_Model,users_Model}