import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Animated, {Easing, FadeIn} from 'react-native-reanimated';
import CheckBox from '@shipex/components/CheckBox/CheckBox';

import {colors} from '@shipex/constants';
import {BoxImage} from '@assets/Images';
import {AppText} from '@shipex/components/Text/AppText';
import {ArrowRightIcon, ExpandIcon} from '@assets/svgs/Index';
import {ItemProps} from '../types';

export default function ShipmentList({
  name,
  status,
  currency,
  markAll,
  origin_city,
  destination_city,
  className = '',
  boxClassName = '',
  detailsClassName = '',
  locationClassName = '',
  nameClassName = '',
  statusClassName = '',
  expandClassName = '',
}: ItemProps) {
  const [marked, setMarked] = useState(false);
  const toggleMark = () => {
    setMarked(prev => !prev);
  };
  return (
    <Animated.View
      entering={FadeIn.duration(500).easing(Easing.ease)}
      className={`h-[67px] w-full bg-gray-100 rounded-lg flex-row items-center px-2.5 gap-4 mb-2.5 ${className}`}
      style={{backgroundColor: colors.inputBg}}>
      <CheckBox isChecked={markAll ? markAll : marked} onCheck={toggleMark} />

      <Image
        resizeMode="contain"
        className={`h-10 w-10 ${boxClassName}`}
        source={BoxImage}
      />

      <View className={`flex-1 ${detailsClassName}`}>
        <AppText className={`text-sm text-[#3F395C]`}>{currency}</AppText>

        <AppText
          className={`text-base text-[#3F395C] font-bold ${nameClassName}`}
          numberOfLines={1}>
          {name}
        </AppText>

        <View className={`flex-row items-center ${locationClassName}`}>
          <AppText className="text-xs">{origin_city}</AppText>
          <ArrowRightIcon color={colors.primary} />
          <AppText className="text-xs">{destination_city}</AppText>
        </View>
      </View>

      <View
        className={`h-6 bg-blue-50 rounded border justify-center items-center px-1.5 ${statusClassName}`}
        style={{
          backgroundColor: colors.primaryLight,
          borderColor: colors.white,
        }}>
        <AppText style={{color: colors.primary}}>{status}</AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className={`w-6 h-6 rounded-full bg-white justify-center items-center ${expandClassName}`}>
        <ExpandIcon color={colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
}
