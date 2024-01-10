import express from "express";
import { Users } from "../models/user.js";
import { Questions } from "../models/questions.js";
import { addvote, createoptions, createques, deleteQues, deleteoption, getquestion, } from "../controller/questions.js";
import { isAuth } from "./user.js";
const router = express.Router();



router.get("/createques", isAuth,createques);
router.post("/question/:id/options/create",isAuth,createoptions );

router.delete("/question/:id/delete", isAuth, deleteQues );

router.delete("/options/:optionId/delete", isAuth, deleteoption);

router.put("/options/:id/add_vote", isAuth, addvote);

router.get("/questions/:id", isAuth, getquestion);

export default router;
