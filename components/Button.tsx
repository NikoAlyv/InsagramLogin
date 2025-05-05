import {
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
  TextStyle,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '@/theme/colors';
import { normalize } from '@/theme/metrics';
import { useTypography } from '@/hooks/useTypography';
import { TypographyStyles } from '@/theme/typography';
import { ButtonTheme } from '@/helper/ButtonTheme';

type TTypes = 'primary' | 'outlined';
interface IButton {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  types?: TTypes;
}
export const Button: React.FC<IButton> = ({
  title,
  loading,
  onPress,
  types = 'primary',
  style,
}) => {
  const fontsLoaded = useTypography();
  const [pressed, setPressed] = useState<boolean>(false);
  const onPressIn = () => setPressed(true);
  const onPressOut = () => setPressed(false);

  const { component: rootStyles, text: textStyles } = ButtonTheme(types, {
    press: pressed,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.blue} />;
  }

  return (
    <Pressable
      style={[styles.root, rootStyles, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={colors.blue} />
      ) : (
        <Text
          style={[TypographyStyles.robotoRegular14, styles.text, textStyles]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: normalize('vertical', 15),
    justifyContent: 'center',
    borderRadius: 30,
  } as ViewStyle,
  text: {
    textAlign: 'center',
    color: colors.white,
  } as TextStyle,
});
