const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
require('./config/associations');
require('./models/ListEmail');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Define CORS options once
const allowedOrigins = [
  "http://localhost:8080",
  "https://unischeduleuibm.netlify.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ✅ Use CORS middleware before any routes
app.use(cors(corsOptions));

// ✅ Handle preflight requests (important!)
app.options('*', cors(corsOptions));

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
app.use('/api/academic-year', require('./routes/academicYearRoutes'));
app.use('/api/emailList', require('./routes/emailListRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
