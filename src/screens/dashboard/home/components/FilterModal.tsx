import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {FilterModalProps} from '../types';

import {AppText} from '@shipex/components/Text/AppText';
import {colors} from '@shipex/constants';
import {useShipmentStatus} from '@shipex/hooks/useShipment';

export default function FilterModal({
  bottomSheetRef,
  closeBottomSheet,
  className = '',
  contentClassName = '',
  buttonClassName = '',
  headingClassName = '',
  listClassName = '',
  itemClassName = '',
  loadingClassName = '',
}: FilterModalProps) {
  const {shpmentStatus, isLoading} = useShipmentStatus();
  return (
    <BottomSheet
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.15}
          pressBehavior="close"
        />
      )}
      handleIndicatorStyle={{display: 'none'}}
      enablePanDownToClose
      handleStyle={{backgroundColor: 'transparent'}}
      snapPoints={['100%']}
      index={-1}
      //@ts-ignore
      ref={bottomSheetRef}>
      <StatusBar backgroundColor="transparent" translucent />
      <BottomSheetView className="pb-20 h-[316px] bg-white">
        <View
          testID="login-bottom-sheet"
          className={`bg-white rounded-t-3xl w-full  ${contentClassName} ${className}`}>
          <View className="h-1.5 w-9 bg-gray mx-auto mb-[10px] rounded-sm" />

          <View className="flex-row justify-between items-center border-b border-[#EAE7F2] pb-5 px-5">
            <TouchableOpacity onPress={closeBottomSheet}>
              <AppText className={`text-primary text-base ${buttonClassName}`}>
                Cancel
              </AppText>
            </TouchableOpacity>
            <AppText>Filters</AppText>
            <TouchableOpacity onPress={closeBottomSheet}>
              <AppText className={`text-primary text-base ${buttonClassName}`}>
                Done
              </AppText>
            </TouchableOpacity>
          </View>

          <AppText
            className={`font-light text-sm my-2.5 ml-5 text-[#58536E] ${headingClassName}`}>
            SHIPMENT STATUS
          </AppText>

          {isLoading && (
            <View
              className={`h-72 w-full justify-center items-center ${loadingClassName}`}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View
            className={`flex-row items-center gap-5 flex-wrap px-5 ${listClassName}`}>
            {!isLoading &&
              shpmentStatus &&
              shpmentStatus.map(item => (
                <TouchableOpacity
                  onPress={() => {}}
                  key={item.name}
                  className={`p-2.5 items-center justify-center bg-gray-100 rounded-lg ${itemClassName}`}
                  style={{backgroundColor: colors.inputBg}}>
                  <AppText className="text-[#58536E] text-sm capitalize">
                    {item.name}
                  </AppText>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
