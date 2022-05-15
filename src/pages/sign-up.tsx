import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SignUpCard } from '../components/signup-card';
import { SignUpUserFormValues } from '../model/sign-up';
import { required } from '../validators/required.validator';
import { requiredLength } from '../validators/required-length.validator';
import { email } from '../validators/email.validator';
import { useAppDispatch } from '../app/hooks';
import { selectUserFormValues, setUserFormValues } from '../features/sign-up/sign-up.slice';
import { useNavigate } from 'react-router-dom';
import { mapValues } from 'lodash';
import { useSelector } from 'react-redux';
import { EmailRounded, LockRounded } from '@mui/icons-material';

type SignUpUserFormErrors = {
  [K in keyof SignUpUserFormValues]?: string
}

type SignUpUserForm = {
  [K in keyof SignUpUserFormValues]: {
    value: SignUpUserFormValues[K],
    dirty: boolean,
  }
}

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signUpUserData = useSelector(selectUserFormValues);
  const [formValues, setFormValues] = useState<SignUpUserForm>({
    name: {
      value: signUpUserData?.name || '',
      dirty: signUpUserData?.name ? true : false,
    },
    email: {
      value: signUpUserData?.email || '',
      dirty: signUpUserData?.email ? true : false,
    },
    password: {
      value: signUpUserData?.password || '',
      dirty: signUpUserData?.password ? true : false,
    }
  });

  const setValue = (key: keyof SignUpUserFormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues(prev => ({...prev, [key]: { value: event.target.value, dirty: true }}));
  }

  const formValidationErrors = useMemo<SignUpUserFormErrors>(() => ({
    ...(formValues.name.dirty && required('name', formValues.name.value)),
    ...(formValues.email.dirty && (
      required('email', formValues.email.value)
      || email('email', formValues.email.value))
    ),
    ...(formValues.password.dirty && (
      required('password', formValues.password.value)
      || requiredLength('password', formValues.password.value, 8))
    ),
  }), [formValues]);
  const invalidForm = useMemo(() => {
    const formFields = Object.values(formValues);
    return Object.keys(formValidationErrors).length > 0
      || formFields.filter(field => field.dirty).length !== formFields.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValidationErrors]); // Intentially not depending on formValues

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const userFormValues = mapValues(formValues, (value) => value.value) as SignUpUserFormValues;
    dispatch(setUserFormValues(userFormValues));
    navigate('/more-info');
  }

  return (
    <form
      style={{
        height: '100%',
        width: '100%',
      }}
      onSubmit={submitForm}
    >
      <SignUpCard
        content={<>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold'
            }}
            variant="h5"
            color="text.primary"
            gutterBottom
          >
            Sign Up
          </Typography>
            <TextField
              id="first-name-field"
              label="First Name"
              variant="outlined"
              type="text"
              value={formValues.name.value}
              error={!!formValidationErrors.name}
              helperText={formValidationErrors.name || ' '}
              onChange={setValue('name')}
              required
            />
            <TextField
              id="email-field"
              label="Email"
              variant="outlined"
              type="email"
              value={formValues.email.value}
              error={!!formValidationErrors.email}
              helperText={formValidationErrors.email || ' '}
              onChange={setValue('email')}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailRounded />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="password-field"
              label="Password"
              variant="outlined"
              type="password"
              value={formValues.password.value}
              error={!!formValidationErrors.password}
              helperText={formValidationErrors.password || ' '}
              onChange={setValue('password')}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            {/*
              Do we want a confirm password field, or would a hypothentical password recovery
              system cover any mistakes?
            */}
        </>}
        actions={<>
          <Button variant="contained" type="submit" disabled={invalidForm}>Next</Button>
        </>}
      />
    </form>
  );
};