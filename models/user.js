import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    votedQues:  { type: Array, ref: 'questions' }
  
  })
  
  export const Users = mongoose.model("users",userSchema)

//   module.exports = Users