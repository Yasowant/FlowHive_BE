const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN_LOCAL, // Allow only local origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials
};

const configureCors = (app) => {
  app.use(cors(corsOptions));
};

module.exports = configureCors;
