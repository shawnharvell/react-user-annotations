import React from "react";
import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Note, NoteProps } from "..";
import * as Shared from "../../shared";

jest.spyOn(Shared, "openAnnotationEditor").mockImplementation(jest.fn());

const props: NoteProps = {
  xPixels: 100,
  yPixels: 100,
  xPercent: 10,
  yPercent: 10,
  markerColor: "red",
  guid: uuidv4(),
  persistenceKey: "storage-key",
  content: "note content",
  index: 0,
};

describe("Note", () => {
  it.each(["pixels", "percentage", undefined])("renders", (pt) => {
    render(<Note {...props} positionTechnique={pt as Shared.PositionTechnique} />);
    expect(screen.getByText("note content")).toBeTruthy();

    userEvent.click(screen.getByTestId(/annotations-note-marker-/));
    expect(Shared.openAnnotationEditor).toHaveBeenCalledWith(
      props.persistenceKey,
      props.guid,
      expect.objectContaining({ content: props.content, guid: props.guid })
    );
  });
});
