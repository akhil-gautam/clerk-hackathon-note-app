import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import Layout from '../components/Layout';
import styles from './Notes.module.scss';
import { API_URL } from '../constants';
import Editor from '../components/Editor';

const Notes = ({ active, setActive, touchNote }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === '/notes' && active) {
      history.push(`/notes/${active}`);
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const prevNotesCount = notes.length;
    setLoading(true);
    const response = await axios.get(
      `${API_URL}/notes?session=${window.Clerk.session.id}`
    );
    setNotes(response.data.notes);
    (!active || prevNotesCount > response.data.notes.length) &&
      setActive(response.data.notes[0]?.id);
    setLoading(false);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <NotesList
            notes={notes}
            touchNote={touchNote}
            active={active}
            refetch={fetchNotes}
            setActive={setActive}
          />
        </ul>
        <div className={styles.details}>
          {active ? (
            <div className={styles.editorwrapper}>
              <Editor
                active={active}
                refetch={fetchNotes}
                setActive={setActive}
              />
            </div>
          ) : (
            <div className={styles.emptyDetail}>Select a note to view!</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const NotesList = ({ notes = [], touchNote, active, setActive, refetch }) => {
  const setActiveNote = (id) => {
    setActive(id);
  };

  const handleClick = async () => {
    const id = await touchNote();
    refetch();
    setActive(id);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headflex}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
          <h3>Notes</h3>
        </div>

        <button className={styles.newbtn} onClick={handleClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
          <span>New Note</span>
        </button>
      </header>
      <hr />
      {notes.length ? (
        notes.map((note) => (
          <RenderEachNote
            active={active}
            note={note}
            key={note.id}
            setActive={setActiveNote}
          />
        ))
      ) : (
        <EmptyList touchNote={touchNote} active={active} />
      )}
    </>
  );
};

const RenderEachNote = ({ note, active, setActive }) => {
  return (
    <div
      className={`${styles.eachnote} ${
        active == note.id ? styles.activenote : ''
      }`}
      onClick={() => setActive(note.id)}
    >
      <p className={styles.title}>{note.title || 'Untitled note'}</p>
      <p className={styles.datetime}>
        {new Date(note.created_at).toDateString()}
      </p>
    </div>
  );
};

const EmptyList = ({ touchNote, active }) => {
  const history = useHistory();
  const handleClick = async () => {
    await touchNote();
    history.push(`/notes`);
  };

  return (
    <div className={styles.emptyList}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={styles.icon}
        fill='none'
        viewBox='0 0 24 24'
        stroke='#000'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
        />
      </svg>
      <button onClick={handleClick}>Create your first note</button>
    </div>
  );
};

export default Notes;
