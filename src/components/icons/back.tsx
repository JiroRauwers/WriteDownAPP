import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { useTheme } from 'src/Utils/useTheme';

const BackIcon = (props: SvgProps) => {
  const theme = useTheme();
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height="100%"
      preserveAspectRatio="xMinYMin slice"
      width="100%"
      style={{
        borderColor : 'green',
        borderWidth : 1
      }}
      fill={props?.color || theme.text}
      {...props}
    >
      <Path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" />
    </Svg>
  );
};
export default BackIcon;
