import express from "express";
import cors from "cors";
import db from "./src/constant/db.js";


import campusRouter from "./src/api/campus.js";
import roomTypeRouter from "./src/api/roomType.js";
import studentRouter from "./src/api/student.js";
import managerRouter from "./src/api/manager.js";
import roomRouter from "./src/api/room.js";
import registerRoomRouter from "./src/api/registerRoom.js";
import otherRouter from "./src/api/other.js";
import authRouter from "./src/api/auth.js";
import billRouter from "./src/api/bill.js";
import statisticRouter from "./src/api/statistic.js";


const app = express();
app.use(cors());
app.use(express.json());



// Dùng userRoute cho tất cả các route bắt đầu bằng '/campus'
app.use('/api/campus', campusRouter);
// Dùng userRoute cho tất cả các route bắt đầu bằng '/roomType'
app.use('/api/room-type', roomTypeRouter);
// Dùng userRoute cho tất cả các route bắt đầu bằng '/room'
app.use('/api/room', roomRouter);
// Dùng userRoute cho tất cả các route bắt đầu bằng '/registerRoom'
app.use('/api/student-register', registerRoomRouter);
// Dùng studentRouter cho tất cả các route bắt đầu bằng '/student'
app.use('/api/student', studentRouter);
// Dùng managerRouter cho tất cả các route bắt đầu bằng '/manager'
app.use('/api/manager', managerRouter);
// Dùng billRouter cho tất cả các route bắt đầu bằng '/manager'
app.use('/api/bill', billRouter);
// Dùng otherRouter cho tất cả các route bắt đầu bằng '/manager'
app.use('/api/other', otherRouter);
// Dùng managerRouter cho tất cả các route bắt đầu bằng '/manager'
app.use('/api/statistic', statisticRouter);
// Dùng managerRouter cho tất cả các route bắt đầu bằng '/manager'
app.use('/api/auth', authRouter);




// Example Books
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    console.log("ERR",err);
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
