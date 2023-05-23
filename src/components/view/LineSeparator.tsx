import { useTheme } from 'src/Utils/useTheme';

import { View } from '../Themed';

export type LineSeparatorProps = {
  lineColor?: string;
  margin?: number | string;
  opacity?: number;
};

export const LineSeparator = ({
  lineColor,
  opacity = 0.5,
  margin
}: LineSeparatorProps) => {
  const theme = useTheme();

  return (
    <View
      lightColor={lineColor ?? theme.text}
      darkColor={lineColor ?? theme.text}
      style={{
        margin  : margin,
        height  : 1,
        opacity : opacity,
        width   : '80%'
      }}
    />
  );
};
