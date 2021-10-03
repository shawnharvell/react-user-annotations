import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Note, NoteProps } from ".";

export default {
  title: "Note",
};

const props1: NoteProps = {
  xPixels: 100,
  yPixels: 100,
  xPercent: 10,
  yPercent: 10,
  guid: uuidv4(),
  persistenceKey: "storybook-key",
  content: "first item content",
};

const props2: NoteProps = {
  xPixels: 300,
  yPixels: 300,
  xPercent: 30,
  yPercent: 30,
  markerColor: "blue",
  guid: uuidv4(),
  persistenceKey: "storybook-key",
  content: "second item content",
};

export const basic = (): JSX.Element => {
  return (
    <div style={{ padding: "200px" }}>
      <Note {...props1} />
      <br />
      <br />
      <br />
      <br />
      <Note {...props2} />
    </div>
  );
};
