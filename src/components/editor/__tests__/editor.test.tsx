import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Editor } from "..";

import * as Shared from "../../shared";
import * as CTX from "../../context/annotations-context";
const context = {
  annotations: {},
  onSave: jest.fn(),
  onCancel: jest.fn(),
  onDelete: jest.fn(),
};
jest.spyOn(CTX, "useAnnotationsContext").mockReturnValue(context);

const interactionEditorParameters = [
  { persistenceKey: "persitence-key", guid: "my-guid", content: "some content I started with" },
  { persistenceKey: "persitence-key", guid: "my-guid", content: undefined },
];

describe("Editor", () => {
  it("renders", () => {
    render(<Editor />);
  });

  it.each(interactionEditorParameters)("interactions", async (params) => {
    render(<Editor />);

    const starter = params.content || "";
    const data: Shared.NoteData = {
      xPercent: 10,
      yPercent: 10,
      xPixels: 100,
      yPixels: 100,
      ...params,
      markerColor: "red",
      positionTechnique: "percent",
    };

    expect(screen.queryByText("Edit/Update Note")).not.toBeInTheDocument();

    act(() => {
      Shared.openAnnotationEditor(params.persistenceKey, params.guid, data);
    });
    expect(screen.queryByText("Edit/Update Note")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter);

    userEvent.type(screen.getByRole("textbox"), " and some content I added");
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter + " and some content I added");

    userEvent.click(screen.getByText("Save"));
    expect(context.onSave).toHaveBeenCalledWith(
      params.persistenceKey,
      expect.objectContaining({
        guid: params.guid,
        content: starter + " and some content I added",
      })
    );
    expect(screen.queryByText("Edit/Update Note")).not.toBeInTheDocument();

    act(() => {
      Shared.openAnnotationEditor(params.persistenceKey, params.guid, data);
    });
    expect(screen.queryByText("Edit/Update Note")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter);
    userEvent.click(screen.getByText("Delete"));
    expect(context.onDelete).toHaveBeenCalledWith(params.persistenceKey, params.guid);

    act(() => {
      Shared.openAnnotationEditor(params.persistenceKey, params.guid, data);
    });
    expect(screen.queryByText("Edit/Update Note")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter);
    userEvent.click(screen.getByText("Cancel"));
    expect(context.onCancel).toHaveBeenCalledWith(params.persistenceKey, params.guid);
    expect(screen.queryByText("Edit/Update Annotation")).not.toBeInTheDocument();
  });
});
