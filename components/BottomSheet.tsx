import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useCallback, useImperativeHandle, memo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { screenHeight, windowHeight } from '../theme/consts.styles';
import { colors } from '@/theme/colors';

const MAX_TRANSLATE_Y = -windowHeight + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, style }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -windowHeight / 3) {
          scrollTo(0);
        } else if (translateY.value < -windowHeight / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    }, []);

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0),
      };
    }, []);

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none',
      } as any;
    }, []);

    return (
      <>
        <Animated.View
          onTouchStart={() => {
            scrollTo(0);
          }}
          animatedProps={rBackdropProps}
          style={[styles.root, rBackdropStyle, style]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              rBottomSheetStyle,
              { zIndex: 2 },
            ]}
          >
            <View style={styles.line} />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default memo(BottomSheet);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop,
    zIndex: 1,
  } as ViewStyle,
  bottomSheetContainer: {
    height: windowHeight,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    top: screenHeight,
    borderRadius: 25,
  } as ViewStyle,
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  } as ViewStyle,
});
