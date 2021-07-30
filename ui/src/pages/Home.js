import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './Home.module.scss';
import Layout from '../components/Layout';
import { API_URL } from '../constants';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    syncUser();
    fetchNotes();
  }, []);

  const syncUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        session: window.Clerk.session.id,
        email: window.Clerk.user.primaryEmailAddress.emailAddress,
        cid: window.Clerk.user.id,
      });
      if (response.status === 200) {
        window.localStorage.setItem('user-synced', true);
        console.log('User synced successfully.');
      } else {
        console.warn(JSON.parse(JSON.stringify(response)));
      }
    } catch (e) {
      if (e.response.status === 304) {
        window.localStorage.setItem('user-synced', true);
        console.log('User synced successfully.');
      }
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    const response = await axios.get(
      `${API_URL}/notes?session=${window.Clerk.session.id}`
    );
    setNotes(response.data.notes);
    setLoading(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.datetime}>{new Date().toDateString()}</p>
        </div>
        <div className={styles.notescard}>
          <h3 className={styles.notesheader}>Recent notes</h3>
          <div className={styles.notesrow}>
            {notes.length ? (
              notes.map((note) => <NoteCard key={note.id} note={note} />)
            ) : (
              <div>You have not created any notes yet.</div>
            )}
          </div>
        </div>
        <ScratchPad />
      </div>
    </Layout>
  );
};

const NoteCard = ({ note }) => {
  return (
    <a className={styles.notecard} href={`/notes/${note.id}`}>
      <p className={styles.title}>{note.title}</p>
      <p className={styles.footer}>
        {new Date(note.created_at).toDateString()}
      </p>
    </a>
  );
};

// const CreateNewNote = () => {
//   return (
//     <a className={styles.newnote} href='#'>
//       <p className={styles.plus}>+</p>
//       <p>Create new note</p>
//     </a>
//   );
// };

const ScratchPad = () => {
  const [data, setData] = useState('');
  const handleChange = (e) => {
    setData(e.target.value);
  };
  useEffect(() => {
    fetchScratchpad();
  }, []);

  const fetchScratchpad = async () => {
    const response = await axios.get(
      `${API_URL}/scratchpads?session=${window.Clerk.session.id}`
    );
    setData(response.data.data);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.patch(`${API_URL}/scratchpads/save`, {
      session: window.Clerk.session.id,
      data: data,
    });
    toast('Saved successfully!');
    console.info(response.data);
  };

  return (
    <form className={styles.scratchpadwrapper} onSubmit={handleSubmit}>
      <label>SCRATCHPAD</label>
      <textarea
        value={data}
        onChange={handleChange}
        placeholder='Jot down your ideas'
      />
      <button type='submit'>SAVE</button>
    </form>
  );
};

export default Home;
