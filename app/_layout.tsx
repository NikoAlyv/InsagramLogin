import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import LoginScreen from './auth/Login.Screen';
import { colors } from '@/theme/colors';

const _layout = () => {
  return (
    <View style={styles.root}>
      <LoginScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.shadowWhite,
  } as ViewStyle,
});
export default _layout;
