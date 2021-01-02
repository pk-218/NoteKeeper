import { useState, useEffect } from 'react';
import axios from 'axios';
import { Note } from './Note';
import { CreateNote } from './CreateNote';

export const NotesList = () => {
  
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
    axios.get('https://mern-note-keeper.herokuapp.com/notes')
      .then(res => {
        console.log(res)
        setNotes(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    axios.delete('https://mern-note-keeper.herokuapp.com/notes/' + id).then(() => {
      setNotes(prevNotes => {
        return prevNotes.filter((note) => note._id !== id);
      });
    });
  }

  return(
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
  )
} 