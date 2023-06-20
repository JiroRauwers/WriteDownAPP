import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity
} from 'react-native';

import { Theme, useTheme } from 'src/Utils/useTheme';

import { Text } from '../Themed';

type LinkBtnProps = {
  children?: React.ReactNode | React.ReactNode[];
  style?: TextStyle;
  onPress: (event: GestureResponderEvent) => void;
  color?: 'enter';
};

export const Btn = ({ children, style, color, ...props }: LinkBtnProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles(theme).touch,
        style,
        color === 'enter' && styles(theme).enter
      ]}
      {...props}
    >
      <Text
        style={[
          styles(theme).text,
          color === 'enter' && styles(theme).enterText
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    touch: {
      display         : 'flex',
      justifyContent  : 'center',
      borderRadius    : 20,
      padding         : 20,
      backgroundColor : 'transparent'
    },
    text: {
      fontSize      : 20,
      textTransform : 'uppercase',
      textAlign     : 'center',
      fontWeight    : 'bold'
    },
    enter: {
      paddingHorizontal : 30,
      paddingVertical   : 10,
      color             : theme.green,
      borderWidth       : 2,
      borderColor       : theme.green
    },
    enterText: {
      color: theme.green
    }
  });
