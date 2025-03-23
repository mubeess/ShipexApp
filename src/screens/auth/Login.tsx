import React, {useRef} from 'react';
import {Image, StatusBar} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {LogoImage} from '@assets/Images';
import {colors} from '@shipex/constants';
import Button from '@shipex/components/Buttons/Button';
import LoginModal from './components/LoginModal';

function Login() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      className="flex-1 bg-primary justify-center items-center p-5">
      <StatusBar animated backgroundColor={colors.primary} />
      <Image
        testID="login-logo"
        resizeMode="contain"
        source={LogoImage}
        className="h-9 w-full my-auto"
      />
      <Button
        testId="login-button"
        label="Login"
        backgroundColor={colors.white}
        fontColor={colors.primary}
        onPress={openBottomSheet}
        style={{marginTop: 'auto'}}
      />
      <LoginModal
        testID="login-bottom-sheet"
        //@ts-ignore
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
      />
    </Animated.View>
  );
}

export default Login;
