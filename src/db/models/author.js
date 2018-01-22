import mongoose from "mongoose";
import { Schema } from "mongoose";

const AuthorSchema = new Schema({
  firstName: String,
  lastName: String
});

export default mongoose.model("Author", AuthorSchema);
