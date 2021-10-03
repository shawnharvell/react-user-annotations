import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Editor, EditorProps } from "..";

import * as Shared from "../../shared";

const props: EditorProps = { onCancel: jest.fn(), onDeleteNote: jest.fn(), onSaveNote: jest.fn() };

const interactionEditorParameters = [
  { persistenceKey: "persitence-key", guid: "my-guid", content: "some conent I started with" },
  { persistenceKey: "persitence-key", guid: "my-guid", content: undefined },
];

describe("Editor", () => {
  it("renders", () => {
    render(<Editor {...props} />);
  });

  it.each(interactionEditorParameters)("interactions", async (params) => {
    render(<Editor {...props} />);

    const starter = params.content || "";

    expect(screen.queryByText("Edit/Update Note")).not.toBeInTheDocument();
    act(() => {
      Shared.openAnnotationEditor(params.persistenceKey, params.guid, params.content);
    });
    expect(screen.queryByText("Edit/Update Note")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter);

    userEvent.click(screen.getByText("Delete"));
    expect(props.onDeleteNote).toHaveBeenCalledWith(params.persistenceKey, params.guid);

    userEvent.type(screen.getByRole("textbox"), " and some content I added");
    expect(screen.getByRole("textbox")).toHaveDisplayValue(starter + " and some content I added");

    userEvent.click(screen.getByText("Save"));
    expect(props.onSaveNote).toHaveBeenCalledWith(
      params.persistenceKey,
      params.guid,
      starter + " and some content I added"
    );

    userEvent.click(screen.getByText("Cancel"));
    expect(props.onCancel).toHaveBeenCalledWith(params.persistenceKey, params.guid);
    expect(screen.queryByText("Edit/Update Annotation")).not.toBeInTheDocument();
  });
});
