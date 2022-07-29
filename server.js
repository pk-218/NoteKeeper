const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();
const PORT = process.env.PORT || 5000; // running the app on any one of the available ports on Heroku

// Sentry config
Sentry.init({
  dsn: process.env.NODE_SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  debug: true,
});

app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(cors());

const corsOptions = {
  allowedHeaders: [
    "Access-Control-Allow-Headers: sentry-trace",
    "Access-Control-Allow-Headers: baggage",
  ],
};

// using the routes mentioned in router
// const notesRouter = require("./routes/notes");
// app.use("/notes", notesRouter);

const Note = require("./models/note.model");
// const router = require('express').Router();

// read all notes
app.get("/notes/", (req, res) => {
  // return res.status(500).json("Error");
  try {
    let transaction = Sentry.getCurrentHub().getScope().getTransaction();
    let span = transaction.startChild({
      op: "/notes.get_all_notes",
      description: "GET",
    });
    Note.find()
      .then((notes) => res.json(notes))
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err);
      });
    span.finish();
  } catch (err) {
    Sentry.captureException(err);
  }
});

// create a new note
app.post("/notes/add", (req, res) => {
  let transaction = Sentry.startTransaction({
    op: "/notes/add",
    name: "createNode-express",
  });
  Sentry.configureScope((scope) => scope.setSpan(transaction));
  console.log(transaction.name);
  try {
    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
      title,
      content,
    });

    newNote
      .save()
      .then(() => res.json("New note added"))
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err);
      });

    transaction.finish();
  } catch (err) {
    Sentry.captureException(err);
  } finally {
    transaction.finish();
  }
});

// delete a particular note
app.delete("/notes/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.use(Sentry.Handlers.errorHandler());

mongoose.connect("mongodb://admin:secret@127.0.0.1:27017/notesDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Successfully connected to the database.");
});

// load index.html from build folder of client when in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function (req, res) {
  console.log(`Server is listening on port ${PORT}`);
});
