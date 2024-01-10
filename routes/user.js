import express from "express";
import { Users } from "../models/user.js";
const router = express.Router()

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (token) {
      req.user = await Users.findById(token);
      if (req.user) {
        return next();
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("User is not authenticated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
};

router.post('/create', async (req, res) => {
    const { username, password, votedQues } = req.body;
    try {
      const user = await Users.create({ username, password, votedQues });
      res.cookie("token", user._id);
      res.json({ user });
      const { token } = req.cookies;
      // console.log(token)
    } catch (error) {
      console.log(error);
    }
  })


 


export default router;