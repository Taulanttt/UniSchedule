const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
require('./config/associations'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Only use *one* cors config — with proper origin and credentials
app.use(cors({
  origin: "http://localhost:8080", // Your frontend URL
  credentials: true,               // Allow sending cookies/headers
}));

// Optional: Allow preflight requests
app.options('*', cors({
  origin: "http://localhost:8080",
  credentials: true
}));

// Health check
app.get('/', (req, res) => res.send('API is running...'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use('/api/semesters', require('./routes/semesterRoutes'));
app.use('/api/schedules', require('./routes/uniScheduleRoutes'));
app.use('/api/class-locations', require('./routes/classLocationRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/email', require('./routes/emailRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
