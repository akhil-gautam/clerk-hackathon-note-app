import React, { useState, useEffect } from 'react';
import EditorJs from 'react-editor-js';
import axios from 'axios';
import toast from 'react-hot-toast';

import { EDITOR_JS_TOOLS } from '../editor-tools';
import styles from './Editor.module.scss';
import { API_URL } from '../constants';

const Editor = ({ active, setActive, refetch = {} }) => {
  const instanceRef = React.useRef(null);

  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('');
    fetchNote();
  }, [active]);

  const fetchNote = async () => {
    await instanceRef?.current?.clear();
    try {
      const response = await axios.get(
        `${API_URL}/notes/${active}?session=${window.Clerk.session.id}`
      );
      setData(response.data.raw);
      setTitle(response.data.title);
      response.data.raw !== '{}' &&
        (await instanceRef?.current?.render(response.data.raw));
    } catch (e) {
      console.warn(e.message);
    }
  };

  const handleSave = async () => {
    const savedData = await instanceRef.current.save();
    try {
      const response = await axios.patch(`${API_URL}/notes/${active}`, {
        raw: savedData,
        title: title,
        session: window.Clerk.session.id,
      });
      setData(response.data.raw);
      setTitle(response.data.title);
      toast.success('Updated successfully.');
      refetch();
    } catch (e) {
      console.warn(e.message);
    }
  };

  const handleTrash = async () => {
    try {
      const response = await axios.patch(`${API_URL}/notes/${active}/trash`, {
        session: window.Clerk.session.id,
        id: active,
      });
      setActive(null);
      toast.success('Moved to trash.');
      refetch();
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    data && (
      <div className={styles.wrapper}>
        <div className={styles.btn}>
          <button onClick={handleSave}>Save</button>
          <button className={styles.danger} onClick={handleTrash}>
            Trash
          </button>
        </div>

        <textarea
          placeholder='Give me title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputfield}
        />

        <div className={styles.editorwrapper}>
          <EditorJs
            // enableReInitialize={true}
            instanceRef={(instance) => (instanceRef.current = instance)}
            tools={EDITOR_JS_TOOLS}
            data={data}
            placeholder='Start writing in this beautiful editor'
          />
        </div>
      </div>
    )
  );
};

export default Editor;
