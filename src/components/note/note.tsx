import React from "react";

import * as Shared from "../shared";

export interface NoteProps {
  xPercent: number;
  yPercent: number;
  xPixels: number;
  yPixels: number;
  guid: string;
  persistenceKey: string;
  markerColor?: string;
  positionTechnique?: Shared.PositionTechnique;
  content?: string;
}

export const Note: React.FC<NoteProps> = ({
  content,
  xPercent,
  xPixels,
  yPixels,
  yPercent,
  markerColor,
  guid,
  persistenceKey,
  positionTechnique = "pixels",
}) => {
  const onClickEdit = () => {
    Shared.openAnnotationEditor(persistenceKey, guid, content);
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
      data-testid="note-marker"
    >
      {!!content && (
        <div className="note-content">
          {content}
          <div className="react-user-annotations-note-controls">
            <button onClick={onClickEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};
