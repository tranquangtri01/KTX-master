import express from "express";

import db from "../constant/db.js";

const campusRouter = express.Router();
function makeid(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

campusRouter.get("/", (req, res) => {
  const q = "SELECT * FROM campus";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
campusRouter.get("/:id", (req, res) => {
  const campusID = req.params.id;

  const q = "SELECT * FROM campus WHERE id = ?";
  db.query(q, [campusID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

campusRouter.post("/", (req, res) => {
  const q = "INSERT INTO campus(`id`,`name`, `description`, `isChecked`) VALUES (?)";

  const values = [makeid(8),req.body.name, req.body.description, `0`];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

campusRouter.delete("/:id", (req, res) => {
  const campusID = req.params.id;
  const q = " DELETE FROM campus WHERE id = ? ";

  db.query(q, [campusID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

campusRouter.put("/:id", (req, res) => {
  const campusID = req.params.id;
  let q = "";

  console.log(req.body.isChecked, req.body.isChecked !== undefined);
  if (req.body.isChecked !== undefined) {
    q =
      "UPDATE campus SET `isChecked`= " + req.body.isChecked + "  WHERE id = ?";
    db.query(q, [campusID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  } else {
    q = "UPDATE campus SET `name`= ?, `description`= ?  WHERE id = ?";
    const values = [req.body.name, req.body.description];

    db.query(q, [...values, campusID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }
});

export default campusRouter;
