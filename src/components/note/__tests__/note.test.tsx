import React from "react";
import { render, screen } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";

import { Note, NoteProps } from "..";
import { PositionTechnique } from "../../shared";

const props: NoteProps = {
  xPixels: 100,
  yPixels: 100,
  xPercent: 10,
  yPercent: 10,
  markerColor: "red",
  guid: uuidv4(),
};

describe("Note", () => {
  it.each(["pixels", "percentage", undefined])("renders", (pt) => {
    render(
      <Note {...props} positionTechnique={pt as PositionTechnique}>
        note content
      </Note>
    );
    expect(screen.getByText("note content")).toBeTruthy();
  });
});
