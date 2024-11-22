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

// Thêm người dùng vào Firebase
const addUser = async (req, res) => {
  const { name, phone, classes } = req.body;  // them classes
  try {
    const newUserRef = db.ref('users').push();
    await newUserRef.set({ name, classes });  // them classes
    res.status(200).json({ message: "Người dùng đã được thêm thành công" });
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
            // phone: user.phone,
            classes: user.classes
      });
    });

    res.status(200).json({ message: "Dữ liệu đã được đồng bộ vào Firebase" });
  } catch (error) {
    res.status(500).json({ error: "Không thể đồng bộ dữ liệu từ API bên ngoài" });
  }
};

module.exports = { getUsers, addUser, syncData };
