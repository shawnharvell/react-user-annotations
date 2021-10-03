import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { useAnnotationsContext } from "../context";
import * as Shared from "../shared";

export const Editor: React.FC = () => {
  const { onSave, onDelete, onCancel } = useAnnotationsContext();

  const textarea = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [persistenceKey, setPersistenceKey] = useState<string>("");
  const [guid, setGuid] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [data, setData] = useState<Shared.NoteData>();

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const handleEditRequested = (e: CustomEvent<Shared.AnnotationActionEvent>) => {
      setPersistenceKey(e.detail.persistenceKey);
      setGuid(e.detail.guid);
      setContent(e.detail.data.content || "");
      setData(e.detail.data);
      setOpen(true);
    };

    document.addEventListener(Shared.OPEN_ANNOTATION_EDIT, handleEditRequested);
    return () => {
      document.removeEventListener(Shared.OPEN_ANNOTATION_EDIT, handleEditRequested);
    };
  }, []);

  useEffect(() => {
    // puts the cursor at the end of the current text
    if (open && textarea.current) {
      textarea.current.focus();
      textarea.current.setSelectionRange(
        textarea.current.value.length,
        textarea.current.value.length
      );
    }
  }, [open]);

  const handleCancel = useCallback(() => {
    onCancel && onCancel(persistenceKey, guid);
    setOpen(false);
  }, [onCancel, persistenceKey, guid]);

  const handleDelete = useCallback(() => {
    onDelete && onDelete(persistenceKey, guid);
    setOpen(false);
  }, [onDelete, persistenceKey, guid]);

  const handleSave = useCallback(() => {
    onSave && onSave(persistenceKey, { ...data, content } as Shared.NoteData);
    setOpen(false);
  }, [onSave, persistenceKey, content, data]);

  if (!open) {
    return null;
  }

  const editor = (
    <div className="react-user-annotations-editor-overlay">
      <div
        className="react-user-annotations-editor"
        role="region"
        data-testid="react-user-annotations-editor"
      >
        <div className="title" role="heading" aria-level={2}>
          Edit/Update Note
        </div>
        <div className="textarea-container">
          <textarea ref={textarea} value={content} onChange={onChangeContent} />
        </div>
        <div className="button-container">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleSave} disabled={!content}>
            Save
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(editor, document.body);
};
