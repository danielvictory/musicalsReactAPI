// Require Dependencies
require("dotenv").config();
// Use express for the backend
const express = require("express");
// Use mongoose to handle MongoDB
const mongoose = require("mongoose");
// Middleware
const cors = require("cors")
const morgan = require("morgan")

// Import from .env
const {PORT=4000, MONGODB_URL} = process.env

// Initialize app using express
const app = express()

// Database Connection
    // Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
    // Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

// MiddleWare
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({extended: true}));  // encoding for easier input

// Model
const MusicalSchema = new mongoose.Schema({
    title: String,
    music: String,
    lyrics: String,
    book: String,
    premiereYear: String,
    image: String,
})

const Musical = mongoose.model("Musical", MusicalSchema);

// Routes
app.get('/', (req, res) => {
    res.send("api home!");
});

// Index
app.get("/musicals", async (req, res) => {
    try {
        res.json(await Musical.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete
app.delete("/musicals/:id", async (req, res) => {
    try {
        res.json(await Musical.findByIdAndRemove(req.params.is));
    } catch (error) {
        res.status(400).json(error)
    }
})

// Update
app.put("/musicals/:id", async (req, res) => {
    try {
        res.json(await Musical.findByIdAndUpdate(req.params.id, req.body, {new:true}));
    } catch (error) {
        res.status(400).json(error)
    }
})

// Create
app.post("/musicals", async (req, res) => {
    try {
        res.json(await Musical.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})




// Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))