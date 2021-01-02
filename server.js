const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
  console.log("Successfully connected to the Database.");
});

const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}

app.listen(PORT, function (req, res) {
  console.log(`Server is listening on port ${PORT}`);
});
