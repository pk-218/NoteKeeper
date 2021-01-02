const Note = require('../models/note.model');
const router = require('express').Router();

// read all notes
router.route('/').get((req, res) => {
  Note.find()
  .then(notes => res.json(notes))
  .catch(err => res.status(400).json('Error: ' + err));
});

// create a new note
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Note({
      title,
      content
  });

  newNote.save()
    .then(() => res.json('New note added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete a particular note
router.route('/:id').delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
  .then(() => res.json('Note deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// TODO: read a particular note
// router.route('/notes/:id').get((req, res) => { 
//   Note.findById(req.params.id, function(err, note) {
//     if (!note) {
//       res.status(404).send("Note could not be found.");
//     } else {
//       res.json(note);
//     }
//   });
// });

// TODO: patch a particular note


module.exports = router;
