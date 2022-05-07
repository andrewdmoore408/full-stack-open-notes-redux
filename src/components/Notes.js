import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
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

const Notes = ({ notes }) => {
  const dispatch = useDispatch();

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

// export default Notes;

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    };
  }

  return {
    notes: (state.filter === 'IMPORTANT'
    ? state.notes.filter(note => note.important)
    : state.notes.filter(note => !note.important))
  };
};

const ConnectedNotes = connect(mapStateToProps)(Notes);
export default ConnectedNotes;
