const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(express.json())
dotenv.config({ path: `${__dirname}/config.env` })

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

}).then((value) => {
    console.log("connected")
}).catch((err) => {
    console.log(err.message)
});
const users_Schema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    address: { type: String, required: true }
}
    , {
        timestamps: true,
    }
)
const users_Model = mongoose.model('users_Model', users_Schema)

const items_Schema = new mongoose.Schema({
    userId: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    id: { type: Number, required: true, unique: true }

}, {
    timestamps: true
})
const items_Model = mongoose.model('items_Model', items_Schema)



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
                const user = await users_Model.findOne({userId:id});
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
        const items = await items_Model.find({});
        res.send(items)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const createItems = async (req, res) => {
    const { userId, title, description, price, id } = req.body;
    // console.log(req.body)
    try {
        if (userId && title && description && price && id) {
            const createdItem = await items_Model.create(req.body)
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

app.get('/api/users', getUser);
app.post('/api/users', createUser);
app.put('/api/users/:id', editUser)
app.get('/api/items', getItems);
app.post('/api/items', createItems);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening to port on server http://localhost:5000")
})
