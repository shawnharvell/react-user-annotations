import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import * as Shared from "../shared";

export type EditorHandler = (persistenceKey: string, guid: string) => void;

export interface EditorProps {
  onCancel?: (persistenceKey: string, guid: string) => void;
  onDeleteNote?: (persistenceKey: string, guid: string) => void;
  onSaveNote?: (persistenceKey: string, guid: string, content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ onCancel, onDeleteNote, onSaveNote }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [persistenceKey, setPersistenceKey] = useState<string>("");
  const [guid, setGuid] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const handleEditRequested = (e: CustomEvent<Shared.AnnotationActionEvent>) => {
      setPersistenceKey(e.detail.persistenceKey);
      setGuid(e.detail.guid);
      setContent(e.detail.content || "");
      setOpen(true);
    };

    document.addEventListener(Shared.OPEN_ANNOTATION_EDIT, handleEditRequested);
    return () => {
      document.removeEventListener(Shared.OPEN_ANNOTATION_EDIT, handleEditRequested);
    };
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
    onCancel && onCancel(persistenceKey, guid);
  }, [onCancel, persistenceKey, guid]);

  const handleDelete = useCallback(() => {
    onDeleteNote && onDeleteNote(persistenceKey, guid);
  }, [onDeleteNote, persistenceKey, guid]);

  const handleSave = useCallback(() => {
    onSaveNote && onSaveNote(persistenceKey, guid, content);
  }, [onSaveNote, persistenceKey, guid, content]);

  if (!open) {
    return null;
  }

  const editor = (
    <div className="react-user-annotations-editor-overlay">
      <div className="react-user-annotations-editor" role="region">
        <div className="title" role="heading" aria-level={2}>
          Edit/Update Note
        </div>
        <div className="textarea-container">
          <textarea value={content} onChange={onChangeContent} />
        </div>
        <div className="button-container">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(editor, document.body);
};
