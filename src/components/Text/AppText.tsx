import {Text} from 'react-native';
import React from 'react';
import {AppTextProps} from '../types';

export function AppText({
  style,
  type = 'default',
  className = '',
  ...rest
}: AppTextProps) {
  const getTypeClasses = () => {
    switch (type) {
      case 'default':
        return 'text-[14px]';
      case 'defaultSemiBold':
        return 'text-base font-semibold';
      case 'title':
        return 'text-2xl font-bold leading-8';
      case 'subtitle':
        return 'text-sm font-normal text-gray-400';
      case 'link':
        return 'leading-7 text-base text-blue-600';
      default:
        return 'text-[14px]';
    }
  };

  return (
    <Text
      className={`text-gray-900 ${getTypeClasses()} ${className}`}
      style={style}
      {...rest}
    />
  );
}
