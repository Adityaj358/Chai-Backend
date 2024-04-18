import mongoose, {Schema} from "mongoose";

const videoScheme = new Schema(
    {
        videoFile : {
            type : String, //cloudinary services url
            required : true
        },
        thumbnail : {
            type : String, //cloudinary services url
            required : true
        },
        title : {
            type : String, 
            required : true
        },
        description : {
            type : String,
            required : true
        },
        duration : {
            type : Number, //cloudinary services url
            required : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User" 
        }
    }, 
    {
        timestamps:true
    }
)

export const Video = mongoose.model("Video" , videoScheme) 