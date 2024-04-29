require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const keys = require('./config/keys');
const routes = require('./routes');
const connectDB = require('./utils/db');

const { port } = keys;
const { clientUrl } = keys.app;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
  })
);

connectDB();
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
