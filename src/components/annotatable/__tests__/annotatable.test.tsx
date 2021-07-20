import React from "react";
import { Annotatable, AnnotatableProps } from "..";
import { render, screen } from "@testing-library/react";

const defaultProps: AnnotatableProps = { persistenceKey: "unit-test-key" };

describe("Annotatable", () => {
  it("renders", () => {
    render(<Annotatable {...defaultProps}>my child content</Annotatable>);
    expect(screen.getByText("my child content"));
  });
});
