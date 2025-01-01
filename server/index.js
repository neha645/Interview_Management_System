import express from 'express';
import cookieParser from 'cookie-parser';
import { CLIENT_BASE_URL, PORT } from './src/configs/env.js';
import { userRouter, studentRouter, interviewRouter, teacherRouter } from './src/routes/index.js';
import { connectToDB } from './src/configs/db.js';
import cors from 'cors'
import errorHandler from './src/middlewares/errorHandler.js';
// create express instance
const app = express();

// JSON body-parser middleware
app.use(express.json());

// Cookie-parser middleware to parse cookies from requests (for session management)
app.use(cookieParser());

// Enable CORS (Cross-Origin Resource Sharing) middleware
app.use(cors({
    origin: CLIENT_BASE_URL,
    credentials: true
}));

// Connect to database
await connectToDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/teacher', teacherRouter);

// Error handling middleware (must be at the end)
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('Welcome to our server');
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
