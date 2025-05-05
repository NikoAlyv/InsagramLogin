import { TextStyle, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
export type TTypesButton = 'primary' | 'outlined';

type TStates = {
  press?: boolean;
};

type ButtonTheme = {
  normal: typeof normal;
  pressed: typeof pressed;
};

// ! Normal

const normal = {
  primary: {
    component: {
      backgroundColor: colors.blue,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.white,
    } as TextStyle,
  },

  outlined: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.blue,
    } as ViewStyle,
    text: {
      color: colors.blue,
    } as TextStyle,
  },
};

// ! Pressed

const pressed = {
  primary: {
    component: {
      backgroundColor: colors.lightBlue,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.white,
    } as TextStyle,
  },

  outlined: {
    component: {
      backgroundColor: colors.lightGray,
      borderWidth: 1,
      borderColor: colors.blue,
    } as ViewStyle,
    text: {
      color: colors.blue,
    } as TextStyle,
  },
};

const buttonTheme: ButtonTheme = {
  normal,
  pressed,
};

const determineStateIndex = (state: TStates) => {
  if (state.press) {
    return 'pressed';
  }

  return 'normal';
};
export const ButtonTheme = (type: TTypesButton, state: TStates) => {
  const index = determineStateIndex(state);

  const styles = {
    ...buttonTheme[index][type],
  };

  return styles;
};
