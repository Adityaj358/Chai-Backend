import mongoose, {Schema} from "mongoose";
import  jwt  from "jsonwebtoken";
import bcryt from "bcryptjs";

const userScheme = new Schema(
    {
        username:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true 
        },
        email:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullName:{
            type : String,
            required : true,
            trim : true,
            index : true 
        },
        avatar:{
            type : String, //cloudinary services url
            required : true,
        },
        coverImage : {
            type : String, //cloudinary services url
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"

            }
        ],
        password : {
            type : String,
            required : [true, "Password is required"]
        },
        refreshToken : {
            type : String
        }
    },
    {
        timestamps:true
    }
)

userScheme.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcryt.hash(this.password,10)
    next()
})

userScheme.methods.isPasswordCorrect = async function(password){
   return await bcryt.compare(password, this.password)
}

userScheme.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userScheme.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.Schema("User", userScheme)