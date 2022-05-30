import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { SignUpCard } from '../components/signup-card';
import { SignUpUserFormValues, SignUpUserFormValuesSchema } from '../model/sign-up';
import { useAppDispatch } from '../app/hooks';
import { selectUserFormValues, setUserFormValues } from '../features/sign-up/sign-up.slice';
import { useNavigate } from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { EmailRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signUpUserData = useSelector(selectUserFormValues);
  const [seePassword, setSeePassword] = useState(false);

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(SignUpUserFormValuesSchema),
    mode: 'onBlur',
    defaultValues: {
      name: signUpUserData?.name || '',
      email: signUpUserData?.email || '',
      password: signUpUserData?.password || '',
    },
  });
  const { errors } = formState;

  const submitForm = (values: SignUpUserFormValues) => {
    dispatch(setUserFormValues(values));
    navigate('/more-info');
  }

  return (
    <form
      style={{
        height: '100%',
        width: '100%',
      }}
      onSubmit={handleSubmit(submitForm)}
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
            {t('page:signUp:label')}
          </Typography>
          <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="first-name-field"
              label={t('form:name:label')}
              variant="outlined"
              type="text"
              required
              {...register('name')}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
            <TextField
              id="email-field"
              label={t('form:email:label')}
              variant="outlined"
              type="email"
              required
              {...register('email')}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disabled>
                      <EmailRounded />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="password-field"
              label={t('form:password:label')}
              variant="outlined"
              type={seePassword ? 'text' : 'password'}
              required
              {...register('password')}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSeePassword(!seePassword)}>
                      {seePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </>}
        actions={<>
          <Button variant="contained" type="submit" disabled={!formState.isValid}>
            {t('common:next')}
          </Button>
        </>}
      />
    </form>
  );
};