import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    phone:{type:Number},
    image:{type:Object}
})
export default mongoose.model.Users||mongoose.model("User",userSchema);