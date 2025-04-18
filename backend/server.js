const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
require('./config/associations'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:8080",
  "https://unischedulem.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Optional: Preflight support
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
app.use('/api/afati', require('./routes/afatiRoutes'));
app.use('/api/academic-year',require('./routes/academicYearRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
