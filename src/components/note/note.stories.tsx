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
};
const props2: NoteProps = {
  xPixels: 300,
  yPixels: 300,
  xPercent: 30,
  yPercent: 30,
  markerColor: "blue",
  guid: uuidv4(),
  persistenceKey: "storybook-key",
};

export const basic = (): JSX.Element => {
  return (
    <div style={{ padding: "200px" }}>
      <Note {...props1}>Some short note content</Note>
      <br />
      <br />
      <br />
      <br />
      <Note {...props2}>
        Donec nec ex dictum, consectetur turpis id, mattis arcu. Donec non ultrices purus. Cras
        dignissim dui at erat faucibus, a ultrices arcu pellentesque. Maecenas feugiat consequat
        nibh lacinia bibendum. Phasellus eget sapien a ex malesuada finibus. Aliquam vestibulum nibh
        vehicula tincidunt gravida. Quisque auctor imperdiet purus, at ullamcorper diam vestibulum
        et. Vestibulum euismod vel urna ut mattis. Cras sit amet velit sapien.
      </Note>
    </div>
  );
};
