import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '../constants';
import Layout from '../components/Layout';
import styles from './Trashed.module.scss';

const Trashed = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchTrashed();
  }, []);

  const fetchTrashed = async () => {
    const response = await axios.get(
      `${API_URL}/notes/trashed?session=${window.Clerk.session.id}`
    );
    setNotes(response.data.notes);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/notes/${id}?session=${window.Clerk.session.id}`
      );
      fetchTrashed();
      toast.success('Deleted successfully!');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/notes/${id}/restore`, {
        id: id,
        session: window.Clerk.session.id,
      });
      toast.success('Restored successfully.');
      fetchTrashed();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Layout>
      <h2 className={styles.header}>Trashed notes</h2>
      <ul className={styles.listContainer}>
        {notes.length ? (
          notes.map((note) => (
            <li className={styles.list} key={note.id}>
              <span className={styles.title}>{note.title}</span>
              <div>
                <span
                  className={styles.btn}
                  title='Restore note!'
                  onClick={() => handleRestore(note.id)}
                >
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
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                </span>
                <span
                  className={styles.btn}
                  title='Delete permanently!'
                  onClick={() => handleDelete(note.id)}
                >
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
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                </span>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.nonotes}>
            <EmptyEmoji />
            There are no notes in trash.
          </div>
        )}
      </ul>
    </Layout>
  );
};

const EmptyEmoji = () => {
  return (
    <svg width='96' height='96' fill='none' class='mx-auto mb-6 text-gray-900'>
      <path
        d='M36 28.024A18.05 18.05 0 0025.022 39M59.999 28.024A18.05 18.05 0 0170.975 39'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
      <ellipse
        cx='37.5'
        cy='43.5'
        rx='4.5'
        ry='7.5'
        fill='currentColor'
      ></ellipse>
      <ellipse
        cx='58.5'
        cy='43.5'
        rx='4.5'
        ry='7.5'
        fill='currentColor'
      ></ellipse>
      <path
        d='M24.673 75.42a9.003 9.003 0 008.879 5.563m-8.88-5.562A8.973 8.973 0 0124 72c0-7.97 9-18 9-18s9 10.03 9 18a9 9 0 01-8.448 8.983m-8.88-5.562C16.919 68.817 12 58.983 12 48c0-19.882 16.118-36 36-36s36 16.118 36 36-16.118 36-36 36a35.877 35.877 0 01-14.448-3.017'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
      <path
        d='M41.997 71.75A14.94 14.94 0 0148 70.5c2.399 0 4.658.56 6.661 1.556a3 3 0 003.999-4.066 12 12 0 00-10.662-6.49 11.955 11.955 0 00-7.974 3.032c1.11 2.37 1.917 4.876 1.972 7.217z'
        fill='currentColor'
      ></path>
    </svg>
  );
};

export default Trashed;
