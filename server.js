const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let userData = [
   
];


// เพิ่มข้อมูลส่วนตัว
app.post('/api/user', (req, res) => {
    const { fullName, nickname, birthDate, age, gender } = req.body;
    const newUser = {
        id: userData.length + 1,
        fullName,
        nickname,
        birthDate,
        age,
        gender
    };
    userData.push(newUser);
    res.status(201).json(newUser);
});

// แก้ไขข้อมูลส่วนตัว
app.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const { fullName, nickname, birthDate, age, gender } = req.body;

    const userIndex = userData.findIndex(user => user.id === Number(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    userData[userIndex] = { id: Number(id), fullName, nickname, birthDate, age, gender };
    res.json(userData[userIndex]);
});

// ลบข้อมูลส่วนตัว
app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = userData.findIndex(user => user.id === Number(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = userData.splice(userIndex, 1);
    res.json(deletedUser);
});

// ฟังก์ชันดึงข้อมูลทั้งหมด
app.get('/api/users', (req, res) => {
    res.json(userData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
