import { Questions } from "../models/questions.js";
import { Users } from "../models/user.js";

export const createques = async (req, res) => {
    const { question } = req.body;
  
    const userid = req.user._id;
  
    const q = await Questions.create({ question, userid, options: [] });
  
    res.json({ q });
  }

 export const createoptions =  async (req, res) => {
    const quesid = req.params.id;
    const { options } = req.body;
  
    const question = await Questions.findById(quesid);
  
    if (!question) {
      console.log("question not exist");
    } else {
      if (question.userid == req.user._id) {
        question.options.push(...options);
        const updatedQuestion = await question.save();
        res.json(updatedQuestion);
      } else {
        res.send("you cannot add options for other creator");
      }
    }
  }
  export const deleteQues = async (req, res) => {
    const { id } = req.params;
  
    const question = await Questions.findById(id);
    if (question.userid == req.user._id) {
      await Questions.findByIdAndDelete(id);
      res.send(`{Question with id : ${id} is deleted...}`);
    }
  }
  export const deleteoption = async (req, res) => {
    const { optionId } = req.params;
  
    try {
      const updatedQuestion = await Questions.findOneAndUpdate(
        { "options._id": optionId },
        { $pull: { options: { _id: optionId } } },
        { new: true }
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Option not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  export const addvote = async (req, res) => {
    const { id } = req.params;
  
    try {
      const questionAlreadyVoted = await Questions.exists({
        _id: { $in: req.user.votedQues },
        "options.votedBy": req.user._id,
      });
  
      if (questionAlreadyVoted) {
        return res
          .status(400)
          .json({ error: "User has already voted for this question" });
      }
  
      const updatedQuestion = await Questions.findOneAndUpdate(
        { "options._id": id },
        {
          $inc: { "options.$.votes": 1 },
          $addToSet: { "options.$.votedBy": req.user._id },
        }, // Use $inc to increment the votes field
        { new: true }
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Option not found" });
      }
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { votedQues: updatedQuestion._id } },
        { new: true }
      );
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  export const getquestion =  async (req, res) => {
    const { id } = req.params;
    const question = await Questions.findById(id);
    res.json(question);
  }