import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

const app = express();

// Security
app.use(helmet());
// Middleware
app.use(cors());
// Compression
app.use(compression());
app.use(express.json());
// Logging
app.use(morgan("dev"));






// Basic Route for Testing
app.get('/', (req, res) => {
  res.send('MediStore API is running perfectly! 🚀');
});


// 7️⃣ ❗ Error Handling Middleware (ALWAYS LAST)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message,
  });
};

app.use(errorHandler);

export default app;