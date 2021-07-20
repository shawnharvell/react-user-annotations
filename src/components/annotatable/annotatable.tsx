import React from "react";

export interface AnnotatableProps {
  persistenceKey?: string;
}

export const Annotatable: React.FC<AnnotatableProps> = ({ children, persistenceKey = "" }) => {
  return <div data-react-user-annotations-persistence-key={persistenceKey}>{children}</div>;
};
