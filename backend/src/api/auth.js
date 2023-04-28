import express from "express";

import db from "../constant/db.js";

const authRouter = express.Router();

authRouter.get("/login-student", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const q = "SELECT * FROM student WHERE studentID = ? AND password = ?";

  const values = [username, password];
  db.query(q, [...values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  }); 
});
authRouter.get("/login-admin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const q = "SELECT * FROM manager WHERE managerID = ? AND password = ?";

  const values = [username, password];
  db.query(q, [...values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  }); 
});

export default authRouter;
