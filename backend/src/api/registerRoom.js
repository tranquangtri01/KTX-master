import express from "express";

import db from "../constant/db.js";

const registerRoomRouter = express.Router();

registerRoomRouter.get("/", (req, res) => {
  const q =
    "SELECT RF.*, R.currentNum, M.managerName as 'managerName', S.name as 'studentName', R.name as 'roomName' FROM registerForm as RF join room as R ON RF.roomID = R.id JOIN student as S on RF.studentID = S.id JOIN manager as M on RF.managerID = M.id ORDER BY RF.id;";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
registerRoomRouter.get("/:id", (req, res) => {
  const registerFormID = req.params.id;

  const q =
    "SELECT RF.*, R.currentNum, M.managerName as 'managerName', S.name as 'studentName', R.name as 'roomName' FROM registerForm as RF join room as R ON RF.roomID = R.id JOIN student as S on RF.studentID = S.id JOIN manager as M on RF.managerID = M.id WHERE RF.id = ? ";
  db.query(q, [registerFormID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

registerRoomRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO registerForm(`studentID`, `managerID`, `roomID`, `isAccepted`, `dateStart`, `dateEnd`, `dateRegister`) VALUES (?)";

  const values = [
    req.body.studentID,
    req.body.managerID,
    req.body.roomID,
    req.body.isAccepted,
    req.body.dateStart,
    req.body.dateEnd,
    req.body.dateRegister,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

registerRoomRouter.delete("/:id", (req, res) => {
  const registerFormID = req.params.id;
  const q = " DELETE FROM registerForm WHERE id = ? ";

  db.query(q, [registerFormID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

registerRoomRouter.put("/:id", (req, res) => {
  const registerFormID = req.params.id;
  let q = "";
  if (
    req.body.isAccepted !== null &&
    req.body.studentID !== null &&
    req.body.roomID !== null
  ) {
    q =
      "UPDATE registerForm SET isAccepted=" +
      req.body.isAccepted +
      " WHERE  id = " +
      registerFormID;
  }
  console.log(req.body, q);
  // const q =
  //   "UPDATE room SET `name`= ?, `roomTypeID`= ? , `campusID`= ?  WHERE room.id = ?";

  // const values = [req.body.name, req.body.roomTypeID, req.body.campusID];

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

export default registerRoomRouter;
