const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
require('./config/associations'); 
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: "http://localhost:8080", // The URL your frontend runs on
    credentials: true,              // Allow cookies/headers
  }));
app.get('/', (req, res) => res.send('API is running...'));

// Import routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use('/api/semesters', require('./routes/semesterRoutes'));
app.use('/api/schedules', require('./routes/uniScheduleRoutes'));
app.use('/api/class-locations',require('./routes/classLocationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
