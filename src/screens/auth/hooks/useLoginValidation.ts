import {useFormik} from 'formik';

import {useNavigation} from '@react-navigation/native';
import {loginValidationSchema} from '../schema/LoginValidationSchema';
import {LoginScreenNavigationProp} from '../types';
import {useLogin} from '@shipex/hooks/useLogin';

const useLoginValidation = () => {
  const {login, loading} = useLogin();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const initialValues = {
    usr: '',
    pwd: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      const {usr, pwd} = values;
      const response = await login(usr, pwd);
      if (response?.full_name) {
        navigation.navigate('Dashboard');
      }
    },
  });
  const {handleChange, handleSubmit, values, errors} = formik;
  const {usr, pwd} = values;

  return {
    handleChange,
    handleSubmit,
    usr,
    pwd,
    usrError: formik.touched.usr && errors.usr ? errors.usr : '',
    pwdError: formik.touched.pwd && errors.pwd ? errors.pwd : '',
    loading,
  };
};

export default useLoginValidation;
