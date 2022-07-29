import { useState } from "react";
import axios from "axios";
import * as Sentry from "@sentry/react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

export const CreateNote = (props) => {
  // try {
  //   methodDoesNotExist();
  // } catch (err) {
  //   Sentry.captureException(err);
  // }

  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  var handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const performXHRRequest = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  var submitNote = (event) => {
    if (!note.title) {
      alert("Title is required");
    } else if (!note.content) {
      alert("Content can't be blank");
    } else {
      props.onAdd(note);
      const transaction = Sentry.startTransaction({ name: "createNote" });
      // just to see if it appears in the breadcrumbs
      performXHRRequest();
      // Set transaction on scope to associate with errors and get included span instrumentation
      // If there's currently an unfinished transaction, it may be dropped
      Sentry.getCurrentHub().configureScope((scope) =>
        scope.setSpan(transaction)
      );
      const span = transaction.startChild({
        data: {
          note,
        },
        op: "add note",
        name: "createNote-react",
      });
      setNote({
        title: "",
        content: "",
      });
      try {
        axios
          .post("http://localhost:5000/notes/add", note) // sends data to the API endpoint
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        span.finish();
      } catch (err) {
        Sentry.captureException(err);
      } finally {
        transaction.finish();
      }
    }
    event.preventDefault();
  };

  function expand() {
    Sentry.configureScope((scope) => scope.setExtra("new note", ""));
    Sentry.addBreadcrumb({
      category: "note",
      message: "Started writing text for note",
      level: "info",
    });
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
};
