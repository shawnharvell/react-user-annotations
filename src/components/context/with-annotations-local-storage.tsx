/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { AnnotationsContextType } from ".";

import { AnnotationsProviderProps, AnnotationsContext } from "./annotations-context";
import * as Shared from "../shared";
import { Editor } from "../editor";

const localStorageKey = "react-user-annotations-storage";

const localStorageStore = (data: Shared.AnnotationsData) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

const localStorageLoad = (): Shared.AnnotationsData => {
  const json = localStorage.getItem(localStorageKey);
  if (!json) {
    localStorageStore({});
    return {};
  } else {
    return JSON.parse(json) as Shared.AnnotationsData;
  }
};

export const AnnotationsLocalStorageProvider: React.FC<AnnotationsProviderProps> = ({
  children,
  spinner,
}) => {
  const [annotations, setAnnotations] = useState<Shared.AnnotationsData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setAnnotations(localStorageLoad());
    setLoading(false);
  }, []);

  const onSave: Shared.NoteDataSaveHandler = (persistenceKey: string, data: Shared.NoteData) => {
    setAnnotations((previous) => {
      const updated = { ...previous };
      if (!updated[persistenceKey]) {
        updated[persistenceKey] = [];
      }
      const slice = [
        ...updated[persistenceKey].filter((itm) => itm.guid !== data.guid),
        { ...data },
      ];

      const final = { ...updated, [persistenceKey]: slice };
      localStorageStore(final);
      return final;
    });
  };

  const onDelete: Shared.NoteDataDeleteHandler = (persistenceKey: string, guid: string) => {
    setAnnotations((previous) => {
      const updated = { ...previous };
      const slice = [...updated[persistenceKey].filter((itm) => itm.guid !== guid)];

      const final = { ...updated, [persistenceKey]: slice };
      localStorageStore(final);
      return final;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCancel: Shared.NoteDataCancelHandler = (persistenceKey: string, guid: string) => {
    return;
    // if canceling and the note has no content, the note is deleted
    // const note = annotations[persistenceKey]?.find((n) => n.guid == guid);
    // if (note && !note.content) {
    //   onDelete(persistenceKey, guid);
    // }
  };

  const value: AnnotationsContextType = {
    annotations,
    onSave,
    onDelete,
    onCancel,
  };

  if (loading && spinner) {
    return <>{spinner}</>;
  } else if (loading) {
    return null;
  }

  return <AnnotationsContext.Provider value={value}>{children}</AnnotationsContext.Provider>;
};

AnnotationsLocalStorageProvider.displayName = "AnnotationsLocalStorageProvider";

export const withAnnotationsLocalStorageProvider =
  (Component: React.ComponentType, spinner?: React.ReactNode) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (props): JSX.Element => {
    return (
      <AnnotationsLocalStorageProvider spinner={spinner}>
        <Component {...props} />

        <Editor />
      </AnnotationsLocalStorageProvider>
    );
  };
