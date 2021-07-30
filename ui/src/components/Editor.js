import React, { useState } from 'react';
import EditorJs from 'react-editor-js';

import { EDITOR_JS_TOOLS } from '../editor-tools';
import styles from './Editor.module.scss';

const Editor = ({ title, data, handleSave, setTitle }) => {
  const instanceRef = React.useRef(null);

  const handleClick = async () => {
    const savedData = await instanceRef.current.save();
    handleSave(savedData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btn}>
        <button onClick={handleClick}>Save</button>
        <button
          className={styles.danger}
          onClick={() =>
            alert(
              'Please come back in sometime, it is still under development.'
            )
          }
        >
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
          instanceRef={(instance) => (instanceRef.current = instance)}
          tools={EDITOR_JS_TOOLS}
          data={data}
          placeholder='Start writing in this beautiful editor'
        />
      </div>
    </div>
  );
};

export default Editor;
