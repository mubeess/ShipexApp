import * as Yup from 'yup';
export const loginValidationSchema = Yup.object({
  usr: Yup.string().email('Email must be valid!').required('Email is required'),
  pwd: Yup.string().required(),
});
