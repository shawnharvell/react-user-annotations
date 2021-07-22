---
to: src/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.stories.tsx
---
import React from 'react';

import { <%= h.changeCase.pascalCase(name) %>, <%= h.changeCase.pascalCase(name) %>Props } from '.';

export default {
  title: "<%= h.changeCase.pascalCase(name) %>",
};


export const basic = (): JSX.Element => {
  return (<<%= h.changeCase.pascalCase(name) %>>foo</<%= h.changeCase.pascalCase(name) %>>);
};

