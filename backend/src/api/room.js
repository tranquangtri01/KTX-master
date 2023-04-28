import express from "express";

import db from "../constant/db.js";

const roomRouter = express.Router();

roomRouter.get("/", (req, res) => {
  const q =
    "SELECT room.id, room.name, room.currentNum, room.studentList,room.water,room.electric, campus.name as 'campusName', roomType.name as 'roomName' FROM room join campus on room.campusID = campus.id join roomType on room.roomTypeID = roomType.id ORDER BY room.id";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});
roomRouter.get("/:id", (req, res) => {
  const roomID = req.params.id;

  const q =
    "SELECT room.id, room.name, room.currentNum, room.studentList, room.water,room.electric,  room.roomTypeID,  room.campusID,  campus.name as 'campusName', roomType.name as 'roomName' FROM room join campus on room.campusID = campus.id join roomType on room.roomTypeID = roomType.id WHERE room.id = ? ";
  db.query(q, [roomID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomRouter.post("/", (req, res) => {
  const q =
    "INSERT INTO room(`name`, `roomTypeID`, `campusID`, `currentNum`,`electric`,`water`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.roomTypeID,
    req.body.campusID,
    "0",
    "0",
    "0",
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomRouter.delete("/:id", (req, res) => {
  const roomID = req.params.id;
  const q = " DELETE FROM room WHERE id = ? ";

  db.query(q, [roomID], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

roomRouter.put("/:id", (req, res) => {
  const editWS = req.query.editWS;
  const editQuality = req.query.editQuality;
  const roomID = req.params.id;

  if (editWS) {
    // room.water,room.electric
    const q =
    "UPDATE room SET `water`= ?, `electric`= ?   WHERE room.id = ?";
    
    const values = [req.body.water, req.body.elecNum];
    
    db.query(q, [...values, roomID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }else if (editQuality){
    const q =
    "UPDATE room SET `currentNum`= ?, `studentList`= ?   WHERE room.id = ?";
    
    const values = [req.body.currentNum, req.body.studentList];
    
    db.query(q, [...values, roomID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  } else {
    

    const q =
      "UPDATE room SET `name`= ?, `roomTypeID`= ? , `campusID`= ?  WHERE room.id = ?";

    const values = [req.body.name, req.body.roomTypeID, req.body.campusID];

    db.query(q, [...values, roomID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }
});

export default roomRouter;
