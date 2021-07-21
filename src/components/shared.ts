export const CHANGE_MODE = "react-user-annotations-change-mode";

export const OPEN_ANNOTATION_EDIT = "react-user-annotations-";
export const CLOSE_ANNOTATION_EDIT = "react-user-annotations-";

export type AnnotatableChangeModeEvent = {
  mode: AnnotatableMode;
};

export interface AnnotationActionEvent {
  guid: string;
  content?: string;
}

declare global {
  interface DocumentEventMap {
    [CHANGE_MODE]: CustomEvent<AnnotatableChangeModeEvent>;
  }
}

export type AnnotatableMode = "add" | "view" | "sticky-add";

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
