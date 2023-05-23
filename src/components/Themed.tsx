/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView
} from 'react-native';

import Colors from '../constants/Colors';

export const useThemeColor = (
  props: Partial<Record<keyof typeof Colors, string>>,
  colorName: keyof typeof Colors.Latte &
    keyof typeof Colors.Frappe &
    keyof typeof Colors.Macchiato &
    keyof typeof Colors.Mocha
) => {
  const theme = useColorScheme() === 'dark' ? 'Mocha' : 'Latte';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ Latte: lightColor, Mocha: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { Latte: lightColor, Mocha: darkColor },
    'base'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
