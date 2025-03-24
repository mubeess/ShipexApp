import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import CheckBox from '@shipex/components/CheckBox/CheckBox';
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

import {colors} from '@shipex/constants';
import {BoxImage} from '@assets/Images';
import {AppText} from '@shipex/components/Text/AppText';
import {
  ArrowRightIcon,
  ExpandIcon,
  PhoneIcon,
  WhatsappIcon,
} from '@assets/svgs/Index';
import {ItemProps} from '../types';
import Button from '@shipex/components/Buttons/Button';

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
  destination_zone,
  origin_zone,
}: ItemProps) {
  const [marked, setMarked] = useState(false);
  const isMarked = markAll || marked;
  const borderProgress = useSharedValue(0);
  const heightValue = useSharedValue(67);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    borderProgress.value = withTiming(isMarked ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isMarked]);

  const toggleMark = () => {
    setMarked(prev => !prev);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.inputBg,
      height: heightValue.value,
      borderWidth: 1,
      borderColor: interpolateColor(
        borderProgress.value,
        [0, 1],
        ['transparent', colors.primary],
      ),
    };
  });

  const toggleHeight = () => {
    heightValue.value = withTiming(heightValue.value == 67 ? 240 : 67, {
      duration: 300,
    });
    setExpanded(prev => !prev);
  };
  const animatedExpandStyle = useAnimatedStyle(() => {
    const backgorund = interpolateColor(
      heightValue.value,
      [67, 240],
      ['#ffffff', '#6E91EC'],
    );
    return {
      backgroundColor: backgorund,
    };
  });
  return (
    <Animated.View
      entering={FadeIn.duration(500).easing(Easing.ease)}
      className={`w-full bg-gray-100 rounded-lg gap-4 mb-2.5 overflow-hidden ${className}`}
      style={[animatedStyles]}>
      <Animated.View
        entering={FadeIn.duration(500).easing(Easing.ease)}
        className={`h-[67px] w-full bg-gray-100 rounded-lg flex-row items-center px-2.5 gap-4 mb-2.5 ${className}`}>
        <CheckBox isChecked={isMarked} onCheck={toggleMark} />

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
        <View
          style={{
            padding: expanded ? 2 : 0,
            backgroundColor: '#D9E6FD',
            borderRadius: 50,
          }}>
          <AnimatedTouchableOpacity
            style={[animatedExpandStyle]}
            onPress={toggleHeight}
            activeOpacity={0.7}
            className={`w-6 h-6 rounded-full bg-white justify-center items-center ${expandClassName}`}>
            <ExpandIcon color={expanded ? '#fff' : colors.primary} />
          </AnimatedTouchableOpacity>
        </View>
      </Animated.View>

      <View className="flex-row items-center justify-between p-[10px]">
        <View className="max-w-[40%]">
          <AppText className="text-primary text-[11px]">Origin</AppText>
          <AppText numberOfLines={1} className="text-black text-[16px]">
            {origin_city}
          </AppText>
          <AppText numberOfLines={1} className="text-[#58536E] text-[13px]">
            {origin_zone}
          </AppText>
        </View>

        <ArrowRightIcon size={20} color={colors.primary} />
        <View className="max-w-[40%]">
          <AppText className="text-primary text-[11px]">Destination</AppText>
          <AppText numberOfLines={1} className="text-black text-[16px]">
            {destination_city}
          </AppText>
          <AppText numberOfLines={1} className="text-[#58536E] text-[13px]">
            {destination_zone}
          </AppText>
        </View>
      </View>

      <View className="flex-row justify-end items-center gap-[20px] mb-[10px] w-full px-[20px]">
        <Button
          IconLeft={<PhoneIcon />}
          backgroundColor="#6E91EC"
          style={{width: 100, marginLeft: 0, marginRight: 0}}
          label="Call"
        />
        <Button
          IconLeft={<WhatsappIcon />}
          style={{width: 142, marginLeft: 0, marginRight: 0}}
          backgroundColor="#25D366"
          label="WhatsApp"
        />
      </View>
    </Animated.View>
  );
}
