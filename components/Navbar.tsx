import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { SvgImage } from './SvgImage';
import { normalize } from '@/theme/metrics';
import { CommonStyles } from '@/theme/common.styles';

type NavbarActions = 'icon' | 'text' | 'none';

type TIcon = {
  icon: NodeRequire;
  text?: string;
  width?: number;
  height?: number;
  color?: string;
};
type NavbarSide = NodeRequire | string | React.ReactNode | undefined | TIcon;

interface INavBar {
  type?: 'large' | 'standard';
  title?: string;
  iconColor?: string;
  left?: NavbarSide;
  right?: NavbarSide;
  titleColor?: string;
  textStyles?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftActionType?: NavbarActions;
  rightActionType?: NavbarActions;
}
export const Navbar: React.FC<INavBar> = ({
  type = 'standard',
  leftActionType,
  iconColor,
  rightActionType,
  left,
  right,
  title,
  onLeftPress,
  titleColor,
  textStyles,
  onRightPress,
  style,
}) => {
  const renderActions = (
    actionType: NavbarActions | undefined,
    data: NavbarSide,
    side: 'left' | 'right' = 'left'
  ) => {
    const hasIcon = data && typeof data === 'object' && 'icon' in data;
    const onPressAction = side === 'left' ? onLeftPress : onRightPress;
    switch (actionType) {
      case 'text':
        return (
          <Text numberOfLines={2} style={[textStyles]}>
            {data as string}
          </Text>
        );

      case 'icon':
        if (hasIcon) {
          const { icon, ...restOfIcon } = data as TIcon;
          return <SvgImage color={iconColor} source={icon} {...restOfIcon} />;
        }
        return <SvgImage color={iconColor} source={data as NodeRequire} />;
      default:
        null;
    }
  };
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onLeftPress}
        style={[styles.action, !leftActionType && styles.hide]}
      >
        {renderActions(leftActionType, left, 'left')}
      </Pressable>
      <Text style={[!!titleColor && { color: titleColor }]}>{title}</Text>
      <Pressable
        onPress={onRightPress}
        style={[
          styles.action,
          styles.actionRight,
          !rightActionType && styles.hide,
        ]}
      >
        {renderActions(rightActionType, right, 'right')}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: normalize('vertical', 6),
    ...CommonStyles.alignCenterJustifyBetweenRow,
  } as ViewStyle,
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  } as ViewStyle,
  actionRight: {
    alignItems: 'flex-end',
  } as ViewStyle,
  hide: {
    opacity: 0,
  } as ViewStyle,
});
