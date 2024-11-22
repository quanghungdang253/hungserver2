const express = require('express');
const { getUsers, addUser, syncData } = require('../controllers/userController');
const router = express.Router();

// API để lấy danh sách người dùng từ Firebase
router.get('/getUsers', getUsers); // định nghĩa route cho tuyến đường 

// API để thêm người dùng vào Firebase
router.post('/addUser', addUser);

// API để đồng bộ dữ liệu từ API bên ngoài vào Firebase
router.post('/syncData', syncData);

module.exports = router;
