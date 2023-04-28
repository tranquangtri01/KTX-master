import express from "express";

import db from "../constant/db.js";

const billRouter = express.Router();

billRouter.get("/", (req, res) => {
  const q = "SELECT * FROM bill";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
billRouter.get("/billID", (req, res) => {
  const billID = req.query.id;

  const q = "SELECT * FROM bill WHERE studentID = ? AND checked = 0 ORDER BY id DESC LIMIT 1";
  db.query(q, [billID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
billRouter.get("/billAll0", (req, res) => {
  const q = "SELECT B.*, B.waterPrice*B.waterNum + B.elecPrice*B.waterNum +roomPrice as total,S.name as 'Sname', S.img FROM bill as B join student as S on B.studentID = S.id  ORDER BY id DESC;";
  db.query(q,  (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
billRouter.get("/billAll", (req, res) => {
  const q = "SELECT B.*, B.waterPrice*B.waterNum + B.elecPrice*B.waterNum +roomPrice as total,S.name as 'Sname', S.img FROM bill as B join student as S on B.studentID = S.id WHERE checked = 1 ORDER BY id DESC;";
  db.query(q,  (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

billRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO bill(`name`, `waterNum`, `elecNum`, `date`, `roomID`, `waterPrice`, `elecPrice`, `roomPrice`, `managerID`, `studentID`, `checked`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.waterNum,
    req.body.elecNum,
    req.body.date,
    req.body.roomID,
    req.body.waterPrice,
    req.body.elecPrice,
    req.body.roomPrice,
    req.body.managerID,
    req.body.studentID,
    "0",
  ];

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return res.send(err);
    return res.json(data);
  });
});


billRouter.put("/checked", (req, res) => {
  const billID = req.body.id;
  console.log(req.body);
  const q =
    "UPDATE bill SET checked = 1  WHERE id = ?";


  db.query(q, [billID], (err, data) => {
    console.log(q, billID);
    if (err) return res.send(err);
    return res.json(data);
  });
});

billRouter.delete("/:id", (req, res) => {
  const roomTypeID = req.params.id;
  const q = " DELETE FROM roomType WHERE id = ? ";

  db.query(q, [roomTypeID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

billRouter.put("/:id", (req, res) => {
  const roomTypeID = req.params.id;
  const q =
    "UPDATE roomType SET `name`= ?, `quality`= ? , `price`= ?  WHERE id = ?";

  const values = [req.body.name, req.body.quality, req.body.price];

  db.query(q, [...values, roomTypeID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default billRouter;
