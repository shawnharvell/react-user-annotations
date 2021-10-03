import React from "react";
import { Annotatable, AnnotatableProps } from "..";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import * as useMouse from "@react-hook/mouse-position";
import * as Shared from "../../shared";
import * as CTX from "../../context";

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

const AnnotatableTester = CTX.withAnnotationsLocalStorageProvider(Annotatable);
const AnnotatableSpinnerTester = CTX.withAnnotationsLocalStorageProvider(
  Annotatable,
  <div>spinning...</div>
);

describe("Annotatable", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders", async () => {
    render(<AnnotatableSpinnerTester {...defaultProps}>my child content</AnnotatableSpinnerTester>);
    expect(screen.getByText("my child content")).toBeTruthy();
  });

  it("alt-CLICK adds pins", () => {
    render(<AnnotatableTester {...defaultProps}>my child content</AnnotatableTester>);
    const container = screen.getByText("my child content");
    expect(container).toBeTruthy();

    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);
    act(() => {
      userEvent.hover(container);
    });
    act(() => {
      userEvent.click(container, { altKey: true });
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(1);
  });

  it("regular CLICK + add mode adds pins (and without doesn't)", async () => {
    jest.useFakeTimers();

    const { container: renderContainer } = render(
      <AnnotatableTester {...defaultProps}>my child content</AnnotatableTester>
    );
    const container = screen.getByText("my child content");
    expect(container).toBeTruthy();

    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);
    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);

    act(() => {
      Shared.enterAnnotationMode();
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(1);
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(0);

    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(1);

    jest.useRealTimers();
  });

  it("providing an intial array of pins works as expected", () => {
    const initialNotes = [
      {
        xPixels: 100,
        yPixels: 100,
        xPercent: 10,
        yPercent: 10,
        color: "red",
        guid: "123",
        children: "some note content",
        persistenceKey: "unit-test-key",
      },
      {
        xPixels: 200,
        yPixels: 200,
        xPercent: 20,
        yPercent: 20,
        color: "red",
        guid: "456",
        children: "some note content",
        persistenceKey: "unit-test-key",
      },
      {
        xPixels: 300,
        yPixels: 300,
        xPercent: 30,
        yPercent: 30,
        color: "red",
        guid: "789",
        children: "some note content",
        persistenceKey: "unit-test-key",
      },
    ];
    localStorage.setItem(
      "react-user-annotations-storage",
      JSON.stringify({ ["unit-test-key"]: initialNotes })
    );
    render(
      <AnnotatableTester
        positionTechnique="percent"
        initialMode="add"
        persistenceKey="unit-test-key"
      >
        my child content
      </AnnotatableTester>
    );
    expect(screen.getByText("my child content")).toBeTruthy();
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(3);

    userEvent.click(screen.getByTestId("annotations-note-marker-456"));
    expect(screen.queryByText("Cancel")).toBeInTheDocument();
    userEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
    expect(screen.getByTestId("annotations-note-marker-456")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("annotations-note-marker-456"));
    expect(screen.queryByText("Delete")).toBeInTheDocument();
    userEvent.click(screen.getByText("Delete"));
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByTestId("annotations-note-marker-456")).not.toBeInTheDocument();
  });

  it("when mouse position is unavailable, pin add attempt is no-op", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(useMouse, "default").mockReturnValueOnce(undefined);
    render(<AnnotatableTester>my child content</AnnotatableTester>);
    expect(screen.getByText("my child content")).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByText("my child content"), { altKey: true });
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);
  });

  it("regular CLICK + sticky-add mode adds pins until it is manually turned off", async () => {
    jest.useFakeTimers();

    const { container: renderContainer } = render(
      <AnnotatableTester {...defaultProps}>my child content</AnnotatableTester>
    );
    const container = screen.getByText("my child content");
    expect(container).toBeTruthy();

    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);
    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(0);

    act(() => {
      Shared.enterAnnotationMode(true);
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(1);
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(renderContainer.querySelectorAll(".mode-flash").length).toEqual(0);

    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(1);

    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(2);

    act(() => {
      Shared.leaveAnnotationMode();
    });
    act(() => {
      userEvent.click(container);
    });
    expect(screen.queryAllByTestId(/annotations-note-marker-/).length).toEqual(2);

    jest.useRealTimers();
  });
});
