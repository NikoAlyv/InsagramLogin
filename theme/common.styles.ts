import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  } as any,

  row: {
    flexDirection: 'row',
  } as ViewStyle,
  rowReverse: {
    flexDirection: 'row-reverse',
  } as ViewStyle,
  justifyCenterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  } as ViewStyle,
  alignCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  alignJustifyCenterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,

  alignCenterJustifyBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  alignCenterJustifyBetweenRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  justifyBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,

  alginSelfCenter: {
    alignSelf: 'center',
  } as ViewStyle,

  textAlignCenter: {
    textAlign: 'center',
  } as TextStyle,
});
