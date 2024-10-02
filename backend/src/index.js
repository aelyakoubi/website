import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import helmet from 'helmet';
import path from 'path';
import sendWelcomeEmail from './services/email/sendWelcomeEmail.js'; // Correct import path
import contactFormRouter from './routes/contactForm.js'; 

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const app = express();

// Use Helmet middleware
app.use(helmet());

// Global middleware
app.use(express.json());
app.use(log);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configure CORS with custom allowed headers
const corsOptions = {
  origin: 'http://localhost:5173',
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

// Routes
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);
app.use("/contact", contactFormRouter); // Correctly mount the router

// Error handling middleware (should be at the end)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
