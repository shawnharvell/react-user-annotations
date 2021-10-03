import React from "react";

import { Editor, EditorProps } from ".";

export default {
  title: "Editor",
};

const props: EditorProps = {};

export const basic = (): JSX.Element => {
  return <Editor {...props}>foo</Editor>;
};
