const express = require('express');
const dotenv = require('dotenv')
const app = express(); //instance of express app
const mongoose = require("mongoose")
const http = require('http')

const cors = require('cors');
app.use(cors()); //using middle cors in your app
dotenv.config()

require('./config/database')()

const server = http.createServer(app)

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`Server is running on port ${PORT}`)) 



// pw   abiabu12