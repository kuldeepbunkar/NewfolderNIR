import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

export const propertySearchSchema = Yup.object().shape({
  location: Yup.string(),
  propertyType: Yup.string(),
  priceRange: Yup.object().shape({
    min: Yup.number().min(0),
    max: Yup.number().min(0)
  }),
  bedrooms: Yup.number().min(0),
  bathrooms: Yup.number().min(0)
});

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5')
    .required('Rating is required'),
  comment: Yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .required('Comment is required')
});

export const tourScheduleSchema = Yup.object().shape({
  date: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Date is required'),
  time: Yup.string().required('Time is required'),
  type: Yup.string().required('Tour type is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required')
}); 