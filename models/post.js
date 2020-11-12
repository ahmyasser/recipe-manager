const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pic:{
        type:String,
    },
    ingredient:{
        type:String
    },
    recipe:{
        type:String,
    },
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("Post",postSchema);