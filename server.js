const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({extended: false})); // translates form to readable format
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // serve static files from public dir

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB")
});

// Schema & Model
const contactSchema = new mongoose.Schema({
    name: String,
    people: Number,
    date: Date,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle Form POST Request
app.post('/submit', async (req, res) => {
    const formData = {
    name: req.body.Name,
    people: req.body.People,
    date: new Date(req.body.date),
    message: req.body.Message,
    };

    try {
        const newContact = new Contact(formData);
        await newContact.save();
        res.redirect('/?success')
    } catch (err) {
        res.redirect('/?error');
    }
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Start Server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server connected on ${PORT}`)
});