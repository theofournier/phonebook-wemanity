require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');


const app = express();

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Log request
app.use(morgan('tiny', {
  skip: (req, res) => { return (req.url === '/'); },
}));

// Routes
app.get('/api', (req, res) => {
  res.send('OK');
});


app.use(express.static(path.join(__dirname, "client/build")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Listening on port ${port}`));