import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import helmet from 'helmet'; // for security Helmet for now more protection later
import path from 'path';

const app = express();

// Use Helmet middleware
app.use(helmet());

// app.use(       // Specify content security policy here later
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"], // Specify your content security policy here
//       },
//     },
//     // Add more custom configurations as needed
//   })
// );

// Global middleware
app.use(express.json()); // Parse JSON request bodies
app.use(log); // Logging middleware

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); // Use process.cwd() for correct path resolution

// Configure CORS with custom allowed headers
const corsOptions = {
  origin: '*', // Allow all origins (NEED to restrict this in production !!!!!)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: '*', // Allow all headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Sentry initialization
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }), // Enable HTTP calls tracing
    new Sentry.Integrations.Express({ app }), // Enable Express.js middleware tracing
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
