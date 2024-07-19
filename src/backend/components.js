const express = require('express');
const { item_Model, users_Model } = require('./models');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const getUser = async (req, res) => {
    const { id, email, password } = req.query;

    try {
        if (email && password) {
            const user = await users_Model.find({ email: email, password: password });
            res.status(200).send(user)
        }
        else {
            const user = await users_Model.find(id ? { userId: id } : {});
            res.status(200).send(user)
        }

    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const getUserById = async(req,res)=>{
    const{id} = req.params;
    try {
        const user = await users_Model.findOne(id?{userId:id}:{})
        res.send(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const getMap = async (req, res) => {
    try {
        res.send(process.env.GOOGLE_API_KEY || "")
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const createUser = async (req, res) => {
    const { userId, userName, first_name, last_name, phone, email, address, password } = req.body;
    try {
        if (userId && userName && first_name && last_name && phone && email && address && password) {
            const createdUser = await users_Model.create(req.body)
            res.status(201).send(createdUser)
        }
        else {
            res.status(404).json({ message: "User attribute not found" })
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const { userName, first_name, last_name, phone, email, address, password } = req.body;
    try {
        if (userName && first_name && last_name && phone && email && address && password) {
            const editUser = await users_Model.findOneAndUpdate({ userId: id }, {
                userName: userName,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                email: email,
                password: password,
                address: address
            })
            if (editUser) {
                const user = await users_Model.findOne({ userId: id });
                res.status(200).send(user);
            }
        }
        else {
            res.status(404).json({ message: "No user found or attribute missing!" })
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const getItems = async (req, res) => {
    try {

        const items = await item_Model.find({});
        res.send(items)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const getItemById = async (req, res) => {
    const { Id } = req.params;
    // console.log(Id)
    try {
        const items = await item_Model.find({ userId: Id })
        // console.log(items)
        res.status(200).send(items)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const getItemByOwnId =async (req, res) => {
    const { id } = req.params;
    // console.log(Id)
    try {
        const items = await item_Model.findOne({ id: id })
        // console.log(items)
        res.status(200).send(items)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const createItems = async (req, res) => {
    const { userId, mainTitle, subTitle, author, description, pages, price, quantity, image, id } = req.body;
    // console.log(req.body)
    try {
        if (userId && mainTitle && subTitle && author && description && pages && price && quantity && image && id) {
            const createdItem = await item_Model.create(req.body)
            res.send(createdItem);
        }
        else {
            res.status(404).json({ message: "One or more attibutes missing" })
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const deleteItem = async (req, res) => {
    const  {id}  = req.params;
    // console.log(id)
    try {
        await item_Model.findOneAndDelete({ id: id })
        res.send('Deleted Sucessfully');
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = { getUser,getUserById, getMap, createUser, editUser, getItems, getItemById,getItemByOwnId, createItems, deleteItem }