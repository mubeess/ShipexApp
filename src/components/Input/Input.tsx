import {colors} from '@shipex/constants';
import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import {AppText} from '../Text/AppText';
import {InputProps} from '../types';

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label = '',
      value,
      error = '',
      icon,
      className = '',
      inputClassName = '',
      labelClassName = '',
      containerClassName = '',
      errorClassName = '',
      iconClassName = '',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(value ? 0 : 15);

    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
    }));

    const handleInputFocus = () => {
      setIsFocused(true);
      labelPosition.value = withTiming(0, {duration: 200});
    };

    const handleInputBlur = () => {
      if (!value) {
        setIsFocused(false);
        labelPosition.value = withTiming(15, {duration: 200});
      }
    };

    const animatedLabelStyle = useAnimatedStyle(() => {
      return {
        top: labelPosition.value,
        fontSize: isFocused ? 12 : 16,
        color: '#A7A3B3',
      };
    });

    const animatedBorderStyle = useAnimatedStyle(() => {
      const borderWidth = interpolate(labelPosition.value, [0, 15], [1, 0]);
      const borderColor = interpolateColor(
        labelPosition.value,
        [0, 15],
        [colors.primary, 'transparent'],
      );
      return {
        borderWidth: borderWidth,
        borderColor,
      };
    });

    return (
      <>
        <Animated.View
          className={`border rounded-lg h-14 mt-5 w-full flex-row bg-gray-100  ${containerClassName} ${className}`}
          style={animatedBorderStyle}>
          {icon && (
            <View
              className={`w-10 bg-transparent justify-center items-center ${iconClassName}`}>
              {icon}
            </View>
          )}
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            activeOpacity={1}
            className={`relative flex-1 justify-center ${inputClassName}`}>
            <Animated.Text
              className={`absolute left-0 px-1.5 z-20 ${labelClassName}`}
              style={animatedLabelStyle}>
              {label}
            </Animated.Text>
            <TextInput
              {...props}
              ref={inputRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`h-full pl-1.5 text-primary bg-[#F4F2F8] rounded-lg`}
              style={{color: colors.primary}}
              value={value}
            />
          </TouchableOpacity>
        </Animated.View>
        {error && (
          <AppText className={`text-red-500 ${errorClassName}`}>
            {error}
          </AppText>
        )}
      </>
    );
  },
);

export default Input;
