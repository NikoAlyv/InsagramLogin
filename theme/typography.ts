import { StyleSheet, TextStyle } from 'react-native';
import { normalize } from './metrics';
import { colors } from './colors';

const fontSize12 = normalize('font', 12);
const fontSize14 = normalize('font', 14);
const fontSize16 = normalize('font', 16);
const fontSize18 = normalize('font', 18);

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  color: colors.black,
};

export const TypographyStyles = StyleSheet.create({
  robotoRegular12: {
    fontSize: fontSize12,
    fontFamily: 'robotoRegular',
    ...commonFontStyling,
  },
  robotoRegular14: {
    fontSize: fontSize14,
    fontFamily: 'robotoRegular',
    ...commonFontStyling,
  },
  robotoRegular16: {
    fontSize: fontSize16,
    fontFamily: 'robotoRegular',
    ...commonFontStyling,
  },
  robotoRegular18: {
    fontSize: fontSize18,
    fontFamily: 'robotoRegular',
    ...commonFontStyling,
  },
});
