import React from "react";

import * as Shared from "../shared";

export interface NoteProps {
  xPercent: number;
  yPercent: number;
  xPixels: number;
  yPixels: number;
  guid: string;
  markerColor?: string;
  positionTechnique?: Shared.PositionTechnique;
  children?: React.ReactNode;
}

export const Note: React.FC<NoteProps> = ({
  children,
  xPercent,
  xPixels,
  yPixels,
  yPercent,
  markerColor,
  guid,
  positionTechnique = "pixels",
}) => {
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
      <div className="note-content">{children}</div>
    </div>
  );
};
