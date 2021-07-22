---
to: src/components/<%= h.changeCase.paramCase(name) %>/__tests__/<%= h.changeCase.paramCase(name) %>.test.tsx
---
import React from 'react';
import { render, screen } from '@testing-library/react';

import { <%= h.changeCase.pascalCase(name) %>, <%= h.changeCase.pascalCase(name) %>Props } from '..';

const defaultProps: <%= h.changeCase.pascalCase(name) %>Props = {
  
};

describe('<%= h.changeCase.pascalCase(name) %>', () => {
  it('renders', () => {
    render(<<%= h.changeCase.pascalCase(name) %> {...props}>foo</<%= h.changeCase.pascalCase(name) %>>);
    expect(screen.getByText("foo")).toBeTruthy();
  });
});
