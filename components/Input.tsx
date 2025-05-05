import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SvgImage } from './SvgImage';
import { colors } from '@/theme/colors';
import { TypographyStyles } from '@/theme/typography';

interface IInput {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
}

export const Input: React.FC<IInput> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const animatedIsFocused = useRef(
    new Animated.Value(value !== '' ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 2],
      outputRange: [12, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: colors.darkGray,
    paddingHorizontal: 4,
    paddingVertical: 10,
  };

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          hitSlop={10}
          style={{ alignSelf: 'center', marginLeft: 8 }}
        >
          <SvgImage
            source={
              !showPassword
                ? require('../assets/vectors/eye-off.svg')
                : require('../assets/vectors/eye.svg')
            }
            width={20}
            height={20}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: colors.shadowWhite,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 8,
    height: 60,
  } as ViewStyle,
  focused: {
    borderColor: colors.gray,
  } as ViewStyle,
  input: {
    flex: 1,
    paddingTop: 16,
    ...TypographyStyles.robotoRegular14,
  } as TextStyle,
  icon: {
    marginLeft: 8,
  } as ViewStyle,
});
