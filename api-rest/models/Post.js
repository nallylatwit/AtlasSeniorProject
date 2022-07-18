const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema (

    {
        userId:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            max:500
        },
        img:{
            type:String,
        },
        likes:{
            type:Array,
            default:[]
        },
        file: {
            type: String,
            max: 100
        }
    },
        {timestamps: true}

);

module.exports = mongoose.model("Post", PostSchema);