const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const CONFIG = require('./config');
const swaggerDocument = require('./swagger.json');
const logger = require('./logger');
const userRoutes = require('./routes/user');
const photoRoutes = require('./routes/photo');
const session = require('./session');

// App configuration
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session());

// Swagger config
if (CONFIG.app === 'dev') swaggerDocument.host = `localhost:${CONFIG.port}`;

// Connection URL
const url = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@ds127954.mlab.com:${CONFIG.db_port}/${CONFIG.db_name}`;

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) logger.error('Cannot connect to Mongo');
});

// Routes
app.get('/', (req, res) => res.send('Welcome to Socialnet!'));
app.post('/login', (req, res) => res.send('Logged!'));
app.use(userRoutes);
app.use(photoRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle error promises
process.on('unhandledRejection', (reason) => {
  logger.error(reason.stack || reason);
});

app.listen(CONFIG.port, (err) => {
  if (err) throw err;
  logger.info(`> Ready on http://localhost:${CONFIG.port}`);
});
