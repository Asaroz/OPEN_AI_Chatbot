import { compare } from "../libs/crypto.js";
import mongoose from "mongoose"

const required = true;
const unique = true;
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required, unique, minlength: 5 },
    password: { type: String, required, minlength: 5 }
})



// userSchema.statics.register = async(userData)=>{
//     try{
//         userData.password = await hash()
//     }
// }


userSchema.statics.login = async(userData) => {
    const user = await User.findOne({ email: userData.email })
    if (!user) {
        return null
    }

    const succes = await compare(userData.password, user.password)

    if (!succes) {
        return null
    }

    return user.toJSON()
}


userSchema.methods.toJSON = function() {
    return {
        email: this.email,
        _id: this._id
    };
}



export const User = mongoose.model("Users", userSchema)