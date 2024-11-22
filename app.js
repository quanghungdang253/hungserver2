// const express = require('express');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// app.use(express.json());

// // Define a route for the root path
// app.get('/', (req, res) => {
//     res.send('Welcome to the API');
//   });
  
// // Sử dụng các route API
// app.use('/api', userRoutes);

// // Lắng nghe trên một cổng (port)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server đang chạy trên cổng ${PORT}`);
// });
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes (for API routes)

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Define a route for the root path
app.get('/', (req, res) => {
        res.send('Welcome to the API'); // Response when accessing the root path (http://localhost:5000/)
        console.log("Kết nối");
});

// Use the routes defined in userRoutes for '/api' path
app.use('/api', userRoutes); // API routes will be available under the '/api' prefix (e.g., /api/getUsers)

// Listen on the specified port (default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
        console.log(`Server đang chạy trên cổng ${PORT}`); // Log message indicating server is running

});
