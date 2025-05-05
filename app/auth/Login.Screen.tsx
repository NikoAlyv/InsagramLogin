import {
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Platform,
  FlatList,
  SafeAreaView,
  ViewStyle,
  ImageStyle,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Table } from '@/components/Table';
import { Input } from '@/components/Input';
import { useTypography } from '@/hooks/useTypography';
import { colors } from '@/theme/colors';
import { normalize } from '@/theme/metrics';
import { Button } from '@/components/Button';
import { TextLink } from '@/components/TextLinks';
import { CommonStyles } from '@/theme/common.styles';
import BottomSheet, { BottomSheetRefProps } from '@/components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TypographyStyles } from '@/theme/typography';
import { language } from '@/data/language';

const LoginScreen = () => {
  const fontsLoaded = useTypography();
  const ref = useRef<BottomSheetRefProps>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>('English (US)');

  const isPlatform = Platform.OS === 'ios' ? 'padding' : 'height';

  const onClickTable = () => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  };

  const handleLanguage = (item: string) => {
    console.log(item);
    setSelectedLanguage(item);
    ref?.current?.scrollTo(0);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.blue} />;
  }

  return (
    <GestureHandlerRootView style={CommonStyles.flex}>
      <KeyboardAvoidingView behavior={isPlatform} style={CommonStyles.flex}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={CommonStyles.flex}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Navbar
                left={require('../../assets/vectors/leftDirection.svg')}
                leftActionType="icon"
                onLeftPress={() => console.log('left')}
              />

              <Table
                title={selectedLanguage}
                onPress={onClickTable}
                icon={require('../../assets/vectors/chevron.svg')}
              />

              <Image
                style={styles.image}
                source={require('../../assets/images/logo.png')}
              />

              <Input
                placeholder="Username, email or mobile number"
                value={username}
                onChangeText={setUsername}
              />

              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />

              <Button title="Log in" />

              <TextLink
                content="Forgot Password?"
                center
                highlighted={[
                  {
                    text: 'Forgot Password?',
                    callback: () => console.log('forget password'),
                  },
                ]}
              />

              <View style={styles.bottomContent}>
                <Button
                  onPress={() => console.log('Create')}
                  title="Create new account"
                  types="outlined"
                />
                <Table
                  textStyle={TypographyStyles.robotoRegular16}
                  icon={require('../../assets/vectors/meta.svg')}
                  title="Meta"
                  style={CommonStyles.rowReverse}
                  disabled={true}
                />
              </View>
            </ScrollView>

            <BottomSheet style={styles.list} ref={ref}>
              <FlatList
                data={language}
                renderItem={({ item }) => (
                  <Table
                    title={item}
                    onPress={() => handleLanguage(item)}
                    textStyle={TypographyStyles.robotoRegular14}
                    style={styles.table}
                    icon={require('../../assets/vectors/square.svg')}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </BottomSheet>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: normalize('horizontal', 10),
    justifyContent: 'center',
    gap: 10,
  },
  image: {
    width: normalize('height', 60),
    height: normalize('width', 60),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: normalize('vertical', 50),
  } as ImageStyle,
  table: {
    justifyContent: 'space-between',
    paddingHorizontal: normalize('horizontal', 20),
    paddingVertical: normalize('vertical', 5),
  } as ViewStyle,
  list: {
    marginBottom: 100,
  } as ViewStyle,
  bottomContent: {
    marginTop: 'auto',
    paddingBottom: 40,
    gap: 10,
  } as ViewStyle,
});

export default LoginScreen;
