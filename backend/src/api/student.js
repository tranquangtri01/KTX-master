import express from "express";
import multer from "multer";

import db from "../constant/db.js";

const studentRouter = express.Router();


studentRouter.get("/", (req, res) => {
  const q = "SELECT * FROM student";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

studentRouter.get("/:id", (req, res) => {
  const studentID = req.params.id;

  const q = "SELECT * FROM student WHERE id = ?";
  db.query(q, [studentID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



studentRouter.post("/", (req, res) => {
  const q = "INSERT INTO student(`name`, `studentID`, `class`, `sex`,`dob`, `cccd`, `email`, `phone`, `hometown`, `note`, `img`, `password` ) VALUES (?)";

  const values = [
    req.body.name,
    req.body.studentID,
    req.body.class,
    req.body.sex,
    req.body.dob,
    req.body.cccd,
    req.body.email,
    req.body.phone,
    req.body.hometown,
    req.body.note,
    req.body.img,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return res.send(err);
    return res.json(data);
  });
});

studentRouter.delete("/:id", (req, res) => {
  const studentID = req.params.id;
  const q = " DELETE FROM student WHERE id = ? ";

  db.query(q, [studentID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

studentRouter.put("/:id", (req, res) => {
  const studentID = req.params.id;
  const q =
    "UPDATE student SET `name`= ?, `studentID`= ?, `class`= ?, `sex`= ?, `dob`= ?, `cccd`= ?, `email`= ?, `phone`= ?, `hometown`= ?, `note`=? , `img`=? ,  `password`=?  WHERE id = ?";

  const values = [
    req.body.name,
    req.body.studentID,
    req.body.class,
    req.body.sex,
    req.body.dob,
    req.body.cccd,
    req.body.email,
    req.body.phone,
    req.body.hometown,
    req.body.note,
    req.body.img,
    req.body.password,

  ];

  db.query(q, [...values, studentID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default studentRouter;
