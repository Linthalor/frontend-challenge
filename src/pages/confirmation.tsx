import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../app/hooks';
import { SignUpCard } from '../components/signup-card';
import {
  selectSignUpStatus,
  selectUserFormValues,
  selectUserPrefsValues,
  signUpAsync,
} from '../features/sign-up/sign-up.slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isError, isValue } from '../model/util/async-prop';
import { Error } from '@mui/icons-material';

export const Confirmation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signUpUserData = useSelector(selectUserFormValues);
  const signUpPrefsData = useSelector(selectUserPrefsValues);
  const signUpStatus = useSelector(selectSignUpStatus);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    if (signUpUserData && signUpPrefsData) {
      dispatch(signUpAsync({
        ...signUpUserData,
        ...signUpPrefsData,
      }))
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted && isValue(signUpStatus)) return navigate('/success');
    if (submitted && isError(signUpStatus)) return navigate('/error');
  }, [signUpStatus, submitted, navigate]);

  if (submitted) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          }}
        >
        <CircularProgress size={200} />
      </Box>
    );
  }

  return (
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
          {t('page:confirmation:label')}
        </Typography>
        <TextField
          id="first-name-confirmation-field"
          label={t('form:name:label')}
          variant="outlined"
          type="text"
          value={signUpUserData?.name}
          error={!signUpUserData?.name}
          disabled
          aria-readonly
        />
        <TextField
          id="email-confirmation-field"
          label={t('form:email:label')}
          variant="outlined"
          type="email"
          value={signUpUserData?.email}
          error={!signUpUserData?.email}
          disabled
          aria-readonly
        />
        {/*
          seems like showing the censored password to the user is a little useless
          and polutes the view. Omitting it.
        */}
        {/* <TextField
          id="password-confirmation-field"
          label={t('form:password:label')}
          variant="outlined"
          type="password"
          value={signUpUserData?.password}
          disabled
          aria-readonly
        /> */}
        <TextField
          id="favorite-color-confirmation-field"
          label={t('form:color:label')}
          variant="outlined"
          type="text"
          value={signUpPrefsData?.color}
          error={!signUpPrefsData?.color}
          disabled
          aria-readonly
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {!signUpPrefsData?.terms && <Error color="error" sx={{ mr: 1}} />}
          <FormControlLabel
            label={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Typography>
                  {t('common:terms:agree')}
                  {' '}
                  {t('common:terms:termsAndConditions')}
                </Typography>
              </Box>
            }
            control={
              <Checkbox
                disabled
                checked={signUpPrefsData?.terms}
              />
            }
          />
        </Box>
      </>}
      actions={<>
        <Button variant='outlined' color='secondary' component={Link} to="/more-info">
          {t('common:back')}
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={!signUpUserData || !signUpPrefsData}
          onClick={onSubmit}
        >
          {t('common:submit')}
        </Button>
      </>}
    />
  );
}