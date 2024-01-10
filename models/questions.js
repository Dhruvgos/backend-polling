import mongoose from "mongoose"


const questionSchema = new mongoose.Schema({
    question: String,
    userid: String,
    options: [
      {
        text: String,
        votes: Number,
        votedBy: { type: Array ,ref: 'users' }
      },
    ],
  });
  
  
  export const Questions = mongoose.model("questions", questionSchema);