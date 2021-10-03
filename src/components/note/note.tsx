import React from "react";

import * as Shared from "../shared";

export type NoteProps = Shared.NoteData & {
  persistenceKey: string;
  index: number;
};

export const Note: React.FC<NoteProps> = (props) => {
  const {
    content,
    xPercent,
    xPixels,
    yPixels,
    yPercent,
    markerColor,
    guid,
    persistenceKey,
    positionTechnique = "pixels",
    index,
  } = props;

  const onClickEdit = () => {
    Shared.openAnnotationEditor(persistenceKey, guid, props);
  };

  const style =
    positionTechnique === "pixels"
      ? {
          left: `${xPixels.toFixed(2)}px`,
          top: `${yPixels.toFixed(2)}px`,
          background: markerColor,
        }
      : {
          left: `${xPercent.toFixed(2)}%`,
          top: `${yPercent.toFixed(2)}%`,
          background: markerColor,
        };
  return (
    <div
      style={style}
      className="react-user-annotations-note"
      data-note-guid={guid}
      data-note-counter={index + 1}
      data-note-persistence-key={persistenceKey}
      data-testid={`annotations-note-marker-${guid}`}
      onClick={onClickEdit}
    >
      {!!content && <div className="note-content">{content}</div>}
    </div>
  );
};
