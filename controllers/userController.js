const axios = require('axios');
const db = require('../firebaseAdmin/firebaseConfig');  // Import Firebase database
app.use(express.json());
// Lấy danh sách người dùng từ Firebase
const getUsers = async (req, res) => {
  try {
    const snapshot = await db.ref('users').once('value');
    const users = snapshot.val();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy dữ liệu từ Firebase" });

  }
};

const addUser = async (req, res) => {
  const { name, phoneNumber, classes , email , district , province,  } = req.body;  // them classes , them email, province, address
  try {
    const newUserRef = db.ref('users').push();
    await newUserRef.set({ name, classes, email,phoneNumber,district, province });  // them classes
    res.status(200).json({ message: "Người dùng đã được thêm thành côngfwfw" });
  } catch (error) {
    res.status(500).json({ error: "Không thể thêm người dùng vào Firebase" });
  }
};

// Đồng bộ dữ liệu từ API bên ngoài vào Firebase
const syncData = async (req, res) => {
  try {
    const response = await axios.get(process.env.DATABASE_URL); // Thay URL API thứ 3 của bạn
    const usersData = response.data;  // Giả sử API trả về mảng người dùng
    
    // Đẩy mỗi người dùng vào Firebase
    usersData.forEach(async (user) => {
      const newUserRef = db.ref('users').push();
      await newUserRef.set({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            district: user.district,
            province: user.province,
            classes: user.classes
      });
    });

    res.status(200).json({ message: "Dữ liệu đã được đông bộ và xử lý " });
  } catch (error) {
    res.status(500).json({ error: "Không thể đồng bộ dữ liệu từ API bên ngoài" });
  }
};

module.exports = { getUsers, addUser, syncData };
