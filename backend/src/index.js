// src/index.js or server.js

import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import helmet from 'helmet'; // for security
import path from 'path';

// Bypass SSL certificate validation (for development purposes only)
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const app = express();

// Use Helmet middleware
app.use(helmet());

// Global middleware
app.use(express.json()); // Parse JSON request bodies
app.use(log); // Logging middleware

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Configure CORS with custom allowed headers
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow all origins (NEED to restrict this in production !!!!!)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: '*', // Allow all headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Sentry initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0, // Capture 100% of transactions
});

// Routes
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);

// Error handling middleware (should be at the end)
app.use(errorHandler);

// Graceful shutdown for Prisma Client
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
