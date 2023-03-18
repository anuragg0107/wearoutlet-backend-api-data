const mongoose=require("mongoose")
mongoose.set('strictQuery',false)
require('dotenv').config()
const connection=mongoose.connect('mongodb+srv://anuragg:anurag@cluster0.cdgqfqz.mongodb.net/?retryWrites=true&w=majority')

module.exports={connection}
