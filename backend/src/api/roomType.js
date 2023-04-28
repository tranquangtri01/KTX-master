import express from "express";

import db from "../constant/db.js";

const roomTypeRouter = express.Router();


roomTypeRouter.get("/", (req, res) => {
  const q = "SELECT * FROM roomType";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data); 
  });
});
roomTypeRouter.get("/:id", (req, res) => {
  const roomTypeID = req.params.id;

  const q = "SELECT * FROM roomType WHERE id = ?";
  db.query(q, [roomTypeID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomTypeRouter.post("/", (req, res) => {
  const q = "INSERT INTO roomType(`name`, `quality`, `price`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.quality,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomTypeRouter.delete("/:id", (req, res) => {
  const roomTypeID = req.params.id;
  const q = " DELETE FROM roomType WHERE id = ? ";

  db.query(q, [roomTypeID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomTypeRouter.put("/:id", (req, res) => {
  const roomTypeID = req.params.id;
  const q =
    "UPDATE roomType SET `name`= ?, `quality`= ? , `price`= ?  WHERE id = ?";

  const values = [
    req.body.name,
    req.body.quality,
    req.body.price,
  ];

  db.query(q, [...values, roomTypeID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default roomTypeRouter;
