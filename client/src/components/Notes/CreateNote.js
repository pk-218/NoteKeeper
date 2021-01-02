import { useState } from 'react';
import axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

export const CreateNote = (props) => {

  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  var handleChange = (event) => {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  var submitNote = (event) => {
    if (!note.title) {
      alert("Title is required");
    } 
    else if (!note.content) {
      alert("Content can't be blank");
    } 
    else {
        props.onAdd(note);
        setNote({
          title: "",
          content: ""
        });
      axios.post("https://mern-note-keeper.herokuapp.com/notes/add", note) // sends data to the API endpoint
          .then(res => console.log(res))
          .catch(err => console.log(err));
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
