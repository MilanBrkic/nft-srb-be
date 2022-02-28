import { getModelForClass } from "@typegoose/typegoose";
import User from "./User";

export const userModel = getModelForClass(User)