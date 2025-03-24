import {colors} from '@shipex/constants';
import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import {AppText} from '../Text/AppText';
import {InputProps} from '../types';
import {InputStyles} from '../styles/input.styles';

const ANIMATION_DURATION = 200;

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
    const animationProgress = useSharedValue(value ? 1 : 0);

    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
    }));

    const handleInputFocus = () => {
      setIsFocused(true);
      animationProgress.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      });
    };

    const handleInputBlur = () => {
      if (!value) {
        setIsFocused(false);
        animationProgress.value = withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        });
      }
    };

    const animatedLabelStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withTiming(animationProgress.value === 1 ? -20 : 0, {
              duration: ANIMATION_DURATION,
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          },
          {
            scale: withTiming(animationProgress.value === 1 ? 0.85 : 1, {
              duration: ANIMATION_DURATION,
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          },
        ],
        color: interpolateColor(
          animationProgress.value,
          [0, 1],
          ['#A7A3B3', '#58536E'],
        ),
      };
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        shadowOpacity: withTiming(animationProgress.value * 0.2, {
          duration: ANIMATION_DURATION,
        }),
        borderColor: interpolateColor(
          animationProgress.value,
          [0, 1],
          ['transparent', colors.primary],
        ),
      };
    });

    return (
      <>
        <Animated.View
          className={`rounded-lg h-[56] mt-5 w-full flex-row bg-[#F4F2F8] ${containerClassName} ${className}`}
          style={[InputStyles.container, animatedContainerStyle]}>
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
            <View className="h-full justify-center">
              <Animated.Text
                className={`absolute z-20 ${labelClassName}`}
                style={[InputStyles.label, animatedLabelStyle]}>
                {label}
              </Animated.Text>
              <TextInput
                {...props}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="h-full pl-3 text-primary bg-transparent rounded-lg"
                style={[InputStyles.input, {color: colors.primary}]}
                value={value}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
        {error && (
          <AppText className={`text-red-500 mt-1 ${errorClassName}`}>
            {error}
          </AppText>
        )}
      </>
    );
  },
);

export default Input;
