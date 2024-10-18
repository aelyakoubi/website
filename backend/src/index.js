import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import usersRouter from "./routes/users.js";
import userAccountRouter from "./routes/useraccount.js";
import signUpUserRouter from "./routes/signUpUser.js";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import helmet from 'helmet';
import path from 'path';
import contactFormRouter from './routes/contactForm.js'; 
import rateLimit from 'express-rate-limit';

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const app = express();

/// only for remove comment out for testing on render.com
// Set 'trust proxy' to enable correct interpretation of X-Forwarded-For header
// app.set('trust proxy', 1); // Trust first proxy (Render's reverse proxy)

// Use Helmet middleware for security headers
app.use(helmet());

// Rate limiting applies globally to all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later.' },
});

// Rate limiting applies specifically to login route.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: { message: 'Too many login attempts, please try again later.' }, // Ensure this is an object for JSON response
});

// Apply global rate limiter
app.use(generalLimiter);

// Global middleware
app.use(express.json());
app.use(log);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configure CORS with custom allowed headers
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Sentry initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// API Routes
app.use("/users", usersRouter);
app.use("/useraccount", userAccountRouter);
app.use("/signup", signUpUserRouter);
app.use("/events", eventsRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginLimiter, loginRouter); // Apply login limiter here
app.use("/contact", contactFormRouter);

// Need to comment out if it creates conflict on render.com // Serve static files from the Vite build directory
app.use(express.static(path.join(process.cwd(), 'frontend', 'dist'))); // Adjust this path if needed

// Need to comment out if it creates conflict on render.com // // Catch-all route to serve the index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html')); // Adjust this path if needed
});


// Error handling middleware (should be at the end)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
