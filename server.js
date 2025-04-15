// const express = require('express');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const app = express();

// // Cấu hình Firebase Admin SDK
// const serviceAccount = require("./config/phonestore-2005-firebase-adminsdk-jdhaj-d9f535351d.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://phonestore-2005-default-rtdb.firebaseio.com/"
// });

// const db = admin.database();

// // Middleware để xử lý JSON
// app.use(bodyParser.json());

// // API để thêm người dùng vào Firebase
// app.post('/addUser', async (req, res) => {
//   const { name, age } = req.body;
//  // cú pháp send dùng để gửi phản hồi từ server về 
//   if (!name || !age) {
//     return res.status(400).send('Tên và tuổi không được để trống.');
//   }

//   try {
//          const newUserRef = db.ref('users').push();
//           await newUserRef.set({ name, age });
//         res.status(200).send('Người dùng đã được thêm vào Firebase');
//   } catch (error) {
//     console.error("Lỗi khi thêm người dùng", error);
//     res.status(500).send('Có lỗi xảy ra khi thêm người dùng');
//   }
// });

// // API để lấy danh sách người dùng
// app.get('/getUsers', async (req, res) => {
//   try {
//     const usersSnapshot = await db.ref('users').once('value');
//     const users = usersSnapshot.val() || {};
//     res.status(200).json(users);
//   } catch (error) {
//       console.error("Lỗi khi lấy người dùng", error);
//       res.status(500).send('Có lỗi xảy ra khi lấy danh sách người dùng');
//   }
// });

// // Lắng nghe trên cổng 5000
// app.listen(5000, () => {
//             console.log('API Backend đang chạy trên cổng 5000');
// });
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');  // Import CORS
const app = express();

// Cấu hình Firebase Admin SDK

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.DATABASE_URL) {
           console.error('Missing required environment variables');
  process.exit(1);
}

require('dotenv').config();
const serviceAccount = {
  "type": "service_account",  // Thêm dòng này để xác nhận đúng loại tài khoản dịch vụ
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};  // process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH

// Cấu hình CORS cho phép tất cả các nguồn truy cập vào backend
 // Cho phép tất cả các nguồn truy cập vào backend
 app.use(cors({
            origin: '*', // Cho phép tất cả các nguồn truy cập vào backend
}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  process.env.DATABASE_URL
});

const db = admin.database();

// Middleware để xử lý JSON
app.use(bodyParser.json());

// Route mặc định cho GET /
app.get('/', (req, res) => {
  console.log(process.env.FIREBASE_PRIVATE_KEY);
  res.send('Chào mừng bạn đến với API Backend! Các endpoint khả dụng: /addUser (POST), /getUsers (GET)fwfwefew');


});

// API để thêm người dùng vào Firebase
app.post('/addUser', async (req, res) => {
  const { FormOfPayment ,dateOfbirth, brotherAndsisters,district,email,fullname,houseNumber,note,phoneNumber,province } = req.body;

  if (!FormOfPayment ,!dateOfbirth, !brotherAndsisters,!district,!email,!fullname,!houseNumber,!note,!phoneNumber,!province) {
        return res.status(400).send('ô nhập liệu k được bỏ trống .');
  }

  try {
    const newUserRef = db.ref('users').push();
    await newUserRef.set({ FormOfPayment ,dateOfbirth, brotherAndsisters,district,email,fullname,houseNumber,note,phoneNumber,province});
    res.status(200).send('Người dùng đã được thêm vào Firebasefefeefefe');
  } catch (error) {
    console.error("Lỗi khi thêm người dùng", error);
    res.status(500).send('Có lỗi xảy ra khi thêm người dùng');
    
  }
});

// API để lấy danh sách người dùng
app.get('/getUsers', async (req, res) => {
  try {
    const usersSnapshot = await db.ref('users').once('value');
    const users = usersSnapshot.val() || {};
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy người dùng", error);
    res.status(500).send('Có lỗi xảy ra khi lấy danh sách người dùng');
  }
});

// Lắng nghe trên cổng 5000
app.listen(5000, () => {
          console.log('API Backend đang chạy trên cổng 5000');
});
