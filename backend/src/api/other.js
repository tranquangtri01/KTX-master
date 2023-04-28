import express from "express";

import db from "../constant/db.js";

const otherRouter = express.Router();

otherRouter.get("/notreq", (req, res) => {
  const q =
    "SELECT * FROM student as S WHERE S.id NOT IN (SELECT registerForm.studentID as 'id' FROM registerForm WHERE  isAccepted = 1  );";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/studentLast", (req, res) => {
  const q = "SELECT * FROM student ORDER BY id DESC LIMIT 5";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/sreq", (req, res) => {
  const q =
    "SELECT * FROM student as S WHERE S.id IN (SELECT registerForm.studentID as 'id' FROM registerForm WHERE  isAccepted = 1  );";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/campusMan/:id", (req, res) => {
  // const managerID = req.query.managerID;
  const managerID = req.params.id;
  const q =
    "SELECT C.* FROM campus AS C JOIN manager as M ON C.id = M.campusID WHERE M.id =" +
    managerID +
    " GROUP BY C.id;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/ris", (req, res) => {
  const campusID = req.query.campusID;
  const q =
    "SELECT R.*, RT.name as 'rt', quality, M.id as 'mid' FROM room as R JOIN roomType as RT on R.roomTypeID = RT.id JOIN manager as M on M.campusID = R.campusID WHERE R.campusID = '" +
    campusID +
    "'";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

otherRouter.get("/checkRegister", (req, res) => {
  const sid = req.query.id;
  const q =
    "SELECT * FROM `registerForm` WHERE studentID = " +
    sid +
    " AND isAccepted = '1';";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/student", (req, res) => {
  const studentID = req.query.id;

  const q = "SELECT * FROM student WHERE id = ?";
  db.query(q, [studentID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

otherRouter.get("/roomRelative", (req, res) => {
  const sid = req.query.id;
  const q =
    "SELECT S.* FROM registerForm as R join student as S on S.id = R.studentID WHERE R.roomID = (SELECT roomID FROM registerForm WHERE studentID = " +
    sid +
    " ORDER BY id DESC LIMIT 1); ";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/getManagerCamp", (req, res) => {
  const roomID = req.query.id;
  const q =
    "SELECT managerID FROM registerForm WHERE roomID = " + 2 + " LIMIT 1 ";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/billStudent", (req, res) => {
  const studentID = req.query.id;
  const q = "SELECT * FROM bill WHERE studentID = " + studentID + ""; 
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
otherRouter.get("/settings-price", (req, res) => {
  const q = "SELECT * FROM config  ORDER BY id DESC LIMIT 1;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

otherRouter.post("/settings-price", (req, res) => {
  const q =
    "INSERT INTO config(`waterPrice`, `electricPrice`, `timeNotfication`) VALUES (?)";

  const values = [req.body.waterPrice, req.body.electricPrice, req.body.date];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default otherRouter;
