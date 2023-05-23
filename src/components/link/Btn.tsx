import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

import { Link } from 'expo-router';
import { Theme, useTheme } from 'src/Utils/useTheme';

import { Text } from '../Themed';

type LinkBtnProps = {
  children?: React.ReactNode | React.ReactNode[];
  style?: TextStyle;
  href: string;
  color?: 'enter';
};

export const LinkBtn = ({ children, style, color, ...props }: LinkBtnProps) => {
  const theme = useTheme();

  return (
    <Link
      style={[
        styles(theme).link,
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
    </Link>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    link: {
      borderRadius    : 20,
      padding         : 20,
      backgroundColor : theme.base
    },
    text: {
      fontSize      : 20,
      textTransform : 'uppercase',
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
