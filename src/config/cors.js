const cors = require('cors');
require('dotenv').config();

const allowedOrigins = [
  process.env.CLIENT_ORIGIN_LOCAL,
  process.env.CLIENT_ORIGIN_PRODUCTION,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials
};

const configureCors = (app) => {
  app.use(cors(corsOptions));
};

module.exports = configureCors;
