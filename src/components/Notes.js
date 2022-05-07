import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import noteService from '../services/notes';

const Note = ({ note, handleClick }) => {
  return(
    <li id={note.id} onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes;
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !(note.important));
  });

  const handleNoteClick = async (event) => {
    let id;

    if (event.target.tagName === 'LI') {
      id = event.target.getAttribute('id');
    } else {
      id = event.target.parentElement.getAttribute('id');
    }

    const updatedNote = await noteService.toggleImportance(id);

    dispatch(toggleImportanceOf(updatedNote));
  };

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={handleNoteClick}
        />
      )}
    </ul>
  );
};

export default Notes;
