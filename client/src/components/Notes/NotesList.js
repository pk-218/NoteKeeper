import { useState, useEffect } from 'react';
import axios from 'axios';
import { Note } from './Note';
import { CreateNote } from './CreateNote';

export const NotesList = () => {
  
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:5000/notes')
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

  // function deleteNote(id) {
  //     setNotes(prevNotes => {
  //       return prevNotes.filter((noteItem, index) => {
  //         return index !== id;
  //       });
  //   });
  // }

  function deleteNote(id) {
    axios.delete('http://localhost:5000/notes/id').then(() => {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
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
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  )
} 