import {ScrollView, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import {Dimensions} from 'react-native';
import {AppText} from '@shipex/components/Text/AppText';
import Button from '@shipex/components/Buttons/Button';
import Input from '@shipex/components/Input/Input';
import {colors} from '@shipex/constants';
import {ModalLoginProps} from '../types';
import {ChevronLeftIcon} from '@assets/svgs/Index';
const {height} = Dimensions.get('window');

export default function LoginModal({
  closeBottomSheet,
  bottomSheetRef,
}: ModalLoginProps) {
  return (
    <BottomSheet
      handleIndicatorStyle={{display: 'none'}}
      enablePanDownToClose
      handleStyle={{
        padding: 0,
        overflow: 'hidden',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 100,
      }}
      snapPoints={['98%']}
      index={-1}
      ref={bottomSheetRef}>
      <BottomSheetView className="flex-1 items-center">
        <View testID="login-bottom-sheet" className="flex-1 w-full">
          <ScrollView className="flex-1 bg-white rounded-t-xl w-full">
            <View
              className="h-[100%] bg-white rounded-t-xl mt-auto p-[12px] relative w-full"
              style={{height: height - 50}}>
              <View className="h-1.5 w-9 bg-gray mx-auto rounded-sm" />
              <TouchableOpacity
                testID="login-modal-close-button"
                onPress={closeBottomSheet}
                className="flex-row gap-2.5 items-center w-[100px]">
                <ChevronLeftIcon color={colors.primary} />
                <AppText className="text-lg text-primary">Cancel</AppText>
              </TouchableOpacity>

              <AppText className="my-2.5 text-black text-[35px] font-bold">
                Login
              </AppText>
              <AppText className="text-lightGray text-base text-justify w-[90%]">
                Please enter Your Login Details Below To Proceed
              </AppText>

              <Input className="my-2.5" label="Username/Email" />

              <Input
                secureTextEntry={true}
                className="my-2.5"
                label="Password"
              />

              <Button
                testId="main-login"
                style={{marginTop: 'auto'}}
                label="Login"
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
