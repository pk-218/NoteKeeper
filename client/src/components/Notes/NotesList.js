import { useState, useEffect } from "react";
import axios from "axios";
import { Note } from "./Note";
import { CreateNote } from "./CreateNote";

export const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes/")
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  // TOFIX
  function deleteNote(id) {
    var toDelete = "http://localhost:5000/notes/" + id;
    console.log(toDelete);
    axios.delete(toDelete).then(() => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== id);
      });
    });
  }

  // TODO
  // Add patch functionality

  return (
    <div>
      <CreateNote onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
};
