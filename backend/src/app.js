const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const security = require('./config/security');
const monitoring = require('./config/monitoring');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Security config
security(app);

// Monitoring config
monitoring(app);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

module.exports = app; 