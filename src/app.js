const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const configureCors = require('./config/cors');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerSpec');
const otpRoutes = require('./routes/otpRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Apply CORS
configureCors(app);

app.use(express.json()); // For JSON parsing

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/otp', otpRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
