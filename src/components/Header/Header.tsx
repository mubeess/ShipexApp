import {AvatarImage, LogoBlue} from '@assets/Images';
import {BellIcon} from '@assets/svgs/Index';
import {colors} from '@shipex/constants';
import React from 'react';
import {Image, TouchableOpacity, View, StatusBar} from 'react-native';
import {HeaderProps} from '../types';

export default function Header({
  className = '',
  avatarClassName = '',
  notificationClassName = '',
  logoClassName = '',
}: HeaderProps) {
  return (
    <View
      className={`h-16 w-full bg-white flex-row items-center justify-between ${className}`}
      style={{paddingTop: StatusBar.currentHeight}}>
      <View
        className={`h-10 w-10 rounded-full bg-gray-300 justify-center items-center ${avatarClassName}`}>
        <Image source={AvatarImage} className="h-10 w-10 rounded-full" />
      </View>

      <Image resizeMode="contain" source={LogoBlue} className={logoClassName} />

      <TouchableOpacity
        className={`h-10 w-10 rounded-full bg-gray-100 justify-center items-center ${notificationClassName}`}
        style={{backgroundColor: colors.inputBg}}>
        <BellIcon color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
