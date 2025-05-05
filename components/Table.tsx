import { Text, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { SvgImage } from './SvgImage';
import { CommonStyles } from '@/theme/common.styles';

interface ITable {
  title: string;
  icon?: NodeRequire;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
export const Table: React.FC<ITable> = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <Pressable
      style={[CommonStyles.alignJustifyCenterRow, style]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={textStyle}>{title}</Text>
      <SvgImage width={20} height={20} source={icon} />
    </Pressable>
  );
};
