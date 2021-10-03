import React, { useContext } from "react";
import * as Shared from "../shared";

export type AnnotationsContextType = {
  annotations: Shared.AnnotationsData;
  onSave?: Shared.NoteDataSaveHandler;
  onCancel?: Shared.NoteDataCancelHandler;
  onDelete?: Shared.NoteDataDeleteHandler;
};

export const AnnotationsContext = React.createContext<AnnotationsContextType>({
  annotations: {},
  onCancel: undefined,
  onSave: undefined,
  onDelete: undefined,
});

export const useAnnotationsContext = (): AnnotationsContextType => useContext(AnnotationsContext);

// note that use of the spinner is optional and probably not terribly important
// for near instant data loads like localStorage and sessionStorage
export type AnnotationsProviderProps = { children: React.ReactNode; spinner?: React.ReactNode };
