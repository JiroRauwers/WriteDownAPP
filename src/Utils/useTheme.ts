import { useEffect, useState } from 'react';

import Colors from 'src/constants/Colors';

import { useColorScheme } from './useColorScheme';

export type Theme = (typeof Colors)[keyof typeof Colors];

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme] as (typeof Colors)[keyof typeof Colors];
};

export const useCreatedTheme = () => {
  const colorScheme = useColorScheme();

  const CreateTheme = (key: keyof typeof Colors) => {
    return {
      dark   : key === 'Frappe' || key === 'Latte',
      colors : {
        primary      : Colors[key].flamingo,
        background   : Colors[key].base,
        card         : Colors[key].overlay1,
        border       : Colors[key].surface2,
        notification : Colors[key].overlay2,
        text         : Colors[key].text
      },
      ...Colors[key]
    } as const;
  };

  const [theme, setTheme] = useState(CreateTheme(colorScheme));

  useEffect(() => {
    console.log('new theme', colorScheme);
    setTheme(CreateTheme(colorScheme));
  }, [colorScheme]);

  return theme;
};
