console.log(require('dotenv').config({path:'.env'}));

// Set up web server running on given port with express. Use port 3001 if not otherwise
// specified
const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const songRoutes = require('./routes/song')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())

var cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/song', songRoutes)
// Homepage route
app.get('/', (req, res) => {
  res.json({msg: 'Homepage'})
})

// Database connection. If there's an error, print error message to console
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
  // Listen for requests
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  })
 })
 .catch((error) => {
  console.log(error)
 })