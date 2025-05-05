import { useFonts } from 'expo-font';

export const useTypography = () => {
  const [fontsLoaded] = useFonts({
    robotoRegular: require('../assets/fonts/RobotoRegular.ttf'),
  });

  return fontsLoaded;
};
