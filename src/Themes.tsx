import { createContext } from 'react';

// export type Theme = {
//   backgroundColor: string;
//   h1Color: string;
//   h2Color: string;
// };

export const themes = {
  light: {
    backgroundColor: 'light-context',
    h1Color: 'grey',
    h2Color: 'grey',
    Progress1: 'cyan',
    Progress2: 'blue',
  },
  dark: {
    backgroundColor: 'black',
    h1Color: 'white',
    h2Color: 'white',
    Progress1: 'cyan',
    Progress2: 'blue',
  },
  pink: {
    backgroundColor: '#FFE9EF',
    h1Color: '#FF9CB5',
    h2Color: '#FFBCCD',
    Progress1: '#FF9CB5',
    Progress2: '#FC809F',
  },
};

export const ThemeContext = createContext(themes.pink);

import React, { useState } from 'react';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.pink);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
