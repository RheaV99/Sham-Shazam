const express = require('express')
const multer = require("multer");
const upload = multer({ dest: "./storage" });

// controller functions
const { getSongDetails, getSongs } = require('../controllers/songController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require authentication for all song routes
router.use(requireAuth)

// GET all songs
router.get('/', getSongs)

// Get details of song + add info to database
router.post('/', upload.single('audio'), getSongDetails);


module.exports = router;