import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await axios.post(API_URL, { title, content });
      setNotes([response.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container">
      <h1>Student Notes Manager</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Note</button>
      </form>

      {loading ? (
        <p className="loading-state">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="empty-state">No notes yet add one above!</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <span className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </span>
              <button
                className="btn-delete"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
