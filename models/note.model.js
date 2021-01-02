const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        //required: [true, "Title is required"]
    },
    content: {
        type: String,
        //required: [true, "Content can't be blank"]
    }
}, {
    timestamps: true,
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;