import React from "react";
import { Annotatable, AnnotatableProps, enterAnnotationMode } from "..";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useMouse from "@react-hook/mouse-position";

jest.spyOn(useMouse, "default").mockReturnValue({
  x: 100,
  y: 100,
  elementWidth: 1000,
  elementHeight: 1000,
  pageX: 0,
  pageY: 0,
  clientX: 0,
  clientY: 0,
  screenX: 0,
  screenY: 0,
  isDown: false,
  isOver: false,
  isTouch: false,
});

const defaultProps: AnnotatableProps = { persistenceKey: "unit-test-key" };

describe("Annotatable", () => {
  it("renders", () => {
    render(<Annotatable {...defaultProps}>my child content</Annotatable>);
    expect(screen.getByText("my child content")).toBeTruthy();
  });

  it("alt-CLICK adds pins", () => {
    render(<Annotatable {...defaultProps}>my child content</Annotatable>);
    const container = screen.getByText("my child content");
    expect(container).toBeTruthy();

    expect(screen.queryAllByTestId("note-marker").length).toEqual(0);
    act(() => {
      userEvent.hover(container);
    });
    act(() => {
      userEvent.click(container, { altKey: true });
    });
    expect(screen.queryAllByTestId("note-marker").length).toEqual(1);
  });

  it("regular CLICK + add mode adds pins (and without doesn't)", async () => {
    jest.useFakeTimers();

    const { container: renderContainer } = render(
      <Annotatable {...defaultProps}>my child content</Annotatable>
    );
    const container = screen.getByText("my child content");
    expect(container).toBeTruthy();

    expect(screen.queryAllByTestId("note-marker").length).toEqual(0);
    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId("note-marker").length).toEqual(0);

    act(() => {
      enterAnnotationMode();
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(1);
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(0);

    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId("note-marker").length).toEqual(1);

    jest.useRealTimers();
  });

  it("providing an intial array of pins works as expected", () => {
    const initialPins = [
      { xPixels: 100, yPixels: 100, xPercent: 10, yPercent: 10, color: "red", guid: "123" },
      { xPixels: 200, yPixels: 200, xPercent: 20, yPercent: 20, color: "red", guid: "456" },
      { xPixels: 300, yPixels: 300, xPercent: 30, yPercent: 30, color: "red", guid: "789" },
    ];
    render(
      <Annotatable initialPins={initialPins} positionTechnique="percent" initialMode="add">
        my child content
      </Annotatable>
    );
    expect(screen.getByText("my child content")).toBeTruthy();
    expect(screen.queryAllByTestId("note-marker").length).toEqual(3);
  });

  it("when mouse position is unavailable, pin add attempt is no-op", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(useMouse, "default").mockReturnValueOnce(undefined);
    render(<Annotatable>my child content</Annotatable>);
    expect(screen.getByText("my child content")).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByText("my child content"), { altKey: true });
    });
    expect(screen.queryAllByTestId("note-marker").length).toEqual(0);
  });
});
