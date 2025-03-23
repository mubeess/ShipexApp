import {ReactElement, ReactNode} from 'react';
import {TextInputProps, ViewStyle, type TextProps} from 'react-native';

export type ButtonProps = {
  IconRight?: ReactElement;
  IconLeft?: ReactElement;
  isLoading?: boolean;
  onPress?: () => void;
  label: string;
  style?: ViewStyle;
  disabled?: boolean;
  backgroundColor?: string;
  testId?: string;
  fontColor?: string;
  className?: string;
};

export type AppTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export interface InputProps extends TextInputProps {
  label?: string;
  value?: string;
  error?: string;
  icon?: ReactNode;
  InputContainerStyle?: ViewStyle;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
}

export type CheckboxProps = {
  isChecked?: boolean;
  onCheck: () => void;
};

export type HeaderProps = {
  className?: string;
  avatarClassName?: string;
  notificationClassName?: string;
  logoClassName?: string;
};
