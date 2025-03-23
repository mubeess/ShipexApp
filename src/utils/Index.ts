import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const handleError = (err: any, show = true) => {
  let {error: response, message: body, statusCode: status} = err;
  if (body && !response) {
    response = {
      data: body,
      status: status,
    };
  }

  if (show && status == 500) {
    Toast.show({
      type: 'error',
      text1: `We're experiencing a temporary hiccup. please try again`,
      text2: '',
      visibilityTime: 4000,
    });
    return {success: false, status, message: body};
  }

  if (show && status !== 401) {
    Toast.show({
      type: 'error',
      text1: 'Un authorized. Please try again',
      text2: '',
      visibilityTime: 4000,
    });
  }
  return {success: false, status, message: body};
};

export const getName = async () => {
  const name = await AsyncStorage.getItem('full_name');
  return name;
};
