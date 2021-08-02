
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();


//app.use(express.json());
app.get('/', (req, res) => res.send('Api is running'));
// Define Routes
app.use('/api/user', require('./second/user'));

app.use('/api/profile', require('./second/profile'));


// Serve static assets in production


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));