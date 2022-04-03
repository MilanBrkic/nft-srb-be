import {Schema} from "mongoose";

const imageModel = new Schema({
   hash:String,
   googleId:String,
   ipnft: String
})
export default imageModel