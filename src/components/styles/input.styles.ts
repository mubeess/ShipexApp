import {colors} from '@shipex/constants';
import {StyleSheet} from 'react-native';

export const InputStyles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
  },
  input: {
    fontSize: 16,
  },
});
