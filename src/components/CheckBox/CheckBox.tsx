import React from 'react';
import {TouchableOpacity} from 'react-native';

import {CheckboxProps} from '../types';
import {colors} from '@shipex/constants';
import {AppText} from '../Text/AppText';

interface CheckboxPropsWithClassName extends CheckboxProps {
  className?: string;
  checkClassName?: string;
}

export default function CheckBox({
  isChecked = false,
  onCheck,
  className = '',
  checkClassName = '',
}: CheckboxPropsWithClassName) {
  return (
    <TouchableOpacity
      onPress={onCheck}
      className={`h-5 w-5 border rounded border-solid justify-center items-center ${className}`}
      style={{
        borderColor: isChecked ? colors.primary : colors.gray,
        backgroundColor: isChecked ? colors.primary : colors.white,
      }}>
      {isChecked && (
        <AppText className={`text-white ${checkClassName}`}>✓</AppText>
      )}
    </TouchableOpacity>
  );
}
