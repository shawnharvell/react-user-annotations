---
to: src/components/<%= h.changeCase.paramCase(name)  %>/<%= h.changeCase.paramCase(name)  %>.tsx
---
import React from 'react';
import './<%= h.changeCase.camelCase(name) %>.scss';

export interface <%= h.changeCase.pascalCase(name) %>Props {}

export const <%= h.changeCase.pascalCase(name) %>: React.FC<<%= h.changeCase.pascalCase(name) %>Props> = ({ children }) => {
  return (
    <div>{ children }</div>
  );
}
