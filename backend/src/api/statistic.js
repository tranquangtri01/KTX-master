import express from "express";
import multer from "multer";

import db from "../constant/db.js";

const statisticRouter = express.Router();


statisticRouter.get("/room-count", (req, res) => {
  const q = "SELECT  COUNT(*) as count FROM room;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
statisticRouter.get("/student-count", (req, res) => {
  const q = "SELECT  COUNT(*) as count FROM student;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
statisticRouter.get("/billmoney-count", (req, res) => {
  const q = "SELECT SUM(waterPrice*waterNum) as waterTotal, SUM(elecPrice*elecNum) as elecTotal, SUM(roomPrice) as roomPrice FROM bill WHERE checked = 1;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
statisticRouter.get("/student-count", (req, res) => {
  const q = "SELECT  COUNT(*) as count FROM student;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

export default statisticRouter;
