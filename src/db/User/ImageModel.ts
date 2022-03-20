import {Schema} from "mongoose";

const imageModel = new Schema({
   hash:String,
   googleId:String
})
export default imageModel