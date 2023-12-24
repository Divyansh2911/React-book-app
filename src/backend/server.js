const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {getUser,getUserById,getMap,createUser,editUser,getItems,getItemById,getItemByOwnId,createItems,deleteItem} = require('./components')
// const  uploadRouter = require('./uploadImage');
const path = require('path');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// const __dirname = path.resolve();
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
// app.use('/api/uploads',uploadRouter)
app.get('/api/users', getUser);
app.get('/api/users/:id',getUserById)
app.get('/api/users/google',getMap)
app.post('/api/users', createUser);
app.put('/api/users/:id', editUser)
app.get('/api/items', getItems);
app.get('/api/items/:Id',getItemById)
app.get('/api/items/own/:id',getItemByOwnId)
app.post('/api/items', createItems);
app.delete('/api/items/:id',deleteItem);
// app.use('/uploads',express.static(path.join(__dirname,`../uploads`)))



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening to port on server http://localhost:5000")
})
