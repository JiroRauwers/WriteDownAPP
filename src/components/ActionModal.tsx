import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Theme, useTheme } from 'src/Utils/useTheme';

type ActionModalProps = {
  handleClose: () => void;
  children: ReactNode | ReactNode[];
};
export const ActionModal = ({ handleClose, children }: ActionModalProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles(theme).safeArea}>
      <TouchableOpacity
        style={[styles(theme).background]}
        onPress={handleClose}
      />
      <View style={[styles(theme).content]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1
    },
    background: {
      flex   : 1,
      zIndex : 9
    },
    content: {
      paddingVertical      : 50,
      borderTopLeftRadius  : 50,
      borderTopRightRadius : 50,
      paddingHorizontal    : 30,
      backgroundColor      : theme.surface0
    }
  });
