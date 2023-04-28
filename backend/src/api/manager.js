import express from "express";

import db from "../constant/db.js";

const managerRouter = express.Router();

managerRouter.get("/", (req, res) => {
  const q =
    "SELECT manager.id, managerName, managerID, role, sex,dob, email, phone, campusID, password, name, img FROM manager JOIN campus ON manager.campusID = campus.id WHERE role = '1';";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
managerRouter.get("/:id", (req, res) => {
  const managerID = req.params.id;

  const q =
    "SELECT manager.id, managerName, managerID, role, sex,dob, email, phone, campusID, password, name, img FROM manager JOIN campus ON manager.campusID = campus.id WHERE role = '1' AND manager.id = ?";
  db.query(q, [managerID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

managerRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO manager(`managerName`, `managerID`, `role`,  `sex`,`dob`, `email`, `phone`, `campusID`, `password` , `img` ) VALUES (?)";

  const values = [
    req.body.managerName,
    req.body.managerID,
    "1",
    req.body.sex,
    req.body.dob,
    req.body.email,
    req.body.phone,
    req.body.campusID,
    req.body.password,
    req.body.img,
  ];

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return res.send(err);
    return res.json(data);
  });
});

managerRouter.delete("/:id", (req, res) => {
  const managerID = req.params.id;
  const q = " DELETE FROM manager WHERE id = ? ";

  db.query(q, [managerID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

managerRouter.put("/:id", (req, res) => {
  const managerID = req.params.id;
  const q =
    "UPDATE manager SET `managerName`= ?, `managerID`= ?, `role`= ?, `sex`= ?, `dob`= ?, `email`= ?, `phone`= ?, `img`=? ,  `password`=?  ,  `campusID`=?   WHERE id = ?";

  const values = [
    req.body.managerName,
    req.body.managerID,
    "1",
    req.body.sex,
    req.body.dob,
    req.body.email,
    req.body.phone,
    req.body.img,
    req.body.password,
    req.body.campusID,
  ];
  
  
  db.query(q, [...values, managerID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default managerRouter;
