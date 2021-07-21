import React, { useState, useEffect } from "react";
import classnames from "classnames";
import useMouse from "@react-hook/mouse-position";
import { v4 as uuidv4 } from "uuid";

import * as Shared from "../shared";

export type PositionTechnique = "pixels" | "percent";

export interface PinProps {
  xPercent: number;
  yPercent: number;
  xPixels: number;
  yPixels: number;
  color: string;
  guid: string;
}

export interface PinStyle {
  background?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginLeft?: string;
}

export const defaultPinStyle: PinStyle = {
  background: "red",
  borderRadius: "10px",
  width: "20px",
  height: "20px",
  marginTop: "-10px",
  marginLeft: "-10px",
};

export interface AnnotatableProps {
  persistenceKey?: string;
  positionTechnique?: PositionTechnique;
  initialMode?: Shared.AnnotatableMode;
  initialPins?: PinProps[];
}

export const Annotatable: React.FC<AnnotatableProps> = ({
  children,
  persistenceKey = uuidv4(),
  positionTechnique = "pixels",
  initialMode = "view",
  initialPins = [],
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [pins, setPins] = useState<PinProps[]>(initialPins);
  const [mode, setMode] = useState<Shared.AnnotatableMode>(initialMode);
  const [showFlash, setShowFlash] = useState<boolean>(false);

  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const onClick: React.MouseEventHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.altKey || mode === "add" || mode === "sticky-add") {
      // alt-click OR a standard click when in add mode will create a new pin/note
      if (mouse && mouse.x && mouse.elementWidth && mouse.y && mouse.elementHeight) {
        const newPin = {
          xPercent: (mouse.x / mouse.elementWidth) * 100,
          yPercent: (mouse.y / mouse.elementHeight) * 100,
          xPixels: mouse.x,
          yPixels: mouse.y,
          color: "red",
          guid: uuidv4(),
        };
        setPins((prev) => [...prev, newPin]);
      }
      if (mode !== "sticky-add") {
        setMode("view");
      }
    }
  };

  useEffect(() => {
    const changeMode = (e: CustomEvent<Shared.AnnotatableChangeModeEvent>) => {
      setMode(e.detail.mode);
    };
    document.addEventListener(Shared.CHANGE_MODE, changeMode);
    return () => {
      document.removeEventListener(Shared.CHANGE_MODE, changeMode);
    };
  }, []);

  useEffect(() => {
    if (mode === "add" || mode === "sticky-add") {
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 500);
    }
  }, [mode]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      data-react-user-annotations-persistence-key={persistenceKey}
      className={classnames("react-user-annotations-annotatable", { "mode-flash": showFlash })}
    >
      {children}
      {pins.map((pin) => {
        const style =
          positionTechnique === "pixels"
            ? {
                ...defaultPinStyle,
                left: `${pin.xPixels.toFixed(2)}px`,
                top: `${pin.yPixels.toFixed(2)}px`,
                background: pin.color,
              }
            : {
                ...defaultPinStyle,
                left: `${pin.xPercent.toFixed(2)}%`,
                top: `${pin.yPercent.toFixed(2)}%`,
                background: pin.color,
              };
        return (
          <div
            style={style}
            key={pin.guid}
            className="react-user-annotations-marker"
            data-testid="note-marker"
          >
            &nbsp;
          </div>
        );
      })}
    </div>
  );
};
