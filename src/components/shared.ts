export const CHANGE_MODE = "react-user-annotations-change-mode";

export const OPEN_ANNOTATION_EDIT = "react-user-annotations-open-edit";
export const CLOSE_ANNOTATION_EDIT = "react-user-annotations-";

export type AnnotatableChangeModeEvent = {
  mode: AnnotatableMode;
};

export interface AnnotationActionEvent {
  persistenceKey: string;
  guid: string;
  content?: string;
}

declare global {
  interface DocumentEventMap {
    [CHANGE_MODE]: CustomEvent<AnnotatableChangeModeEvent>;
    [OPEN_ANNOTATION_EDIT]: CustomEvent<AnnotationActionEvent>;
  }
}

export type AnnotatableMode = "add" | "view" | "sticky-add";

export type PositionTechnique = "pixels" | "percent";

export const enterAnnotationMode = (sticky = false): void => {
  document.dispatchEvent(
    new CustomEvent<AnnotatableChangeModeEvent>(CHANGE_MODE, {
      detail: { mode: sticky ? "sticky-add" : "add" },
    })
  );
};

export const leaveAnnotationMode = (): void => {
  document.dispatchEvent(
    new CustomEvent<AnnotatableChangeModeEvent>(CHANGE_MODE, { detail: { mode: "view" } })
  );
};

export const openAnnotationEditor = (
  persistenceKey: string,
  guid: string,
  content?: string
): void => {
  document.dispatchEvent(
    new CustomEvent<AnnotationActionEvent>(OPEN_ANNOTATION_EDIT, {
      detail: { persistenceKey, guid, content },
    })
  );
};
