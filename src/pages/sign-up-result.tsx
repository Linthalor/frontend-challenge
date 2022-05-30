import { Check, Error } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../app/hooks';
import { SignUpCard } from '../components/signup-card';
import { resetSignUp } from '../features/sign-up/sign-up.slice';

export const SignupResult = ({ success }: { success?: true }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const restart = () => {
    dispatch(resetSignUp());
  };

  return <>
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
          {t(`page:signUpResult:${success ? 'success' : 'error'}:label`)}
        </Typography>
        <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {success 
            ? <Check fontSize="large" color="primary" sx={{ mr: 1 }} />
            : <Error fontSize="large" color="error" sx={{ mr: 1 }} />
          }
          {t(`page:signUpResult:${success ? 'success' : 'error'}:message`)}
        </Typography>
      </>}
      actions={<>
        <Button variant="contained" type="submit" onClick={restart}>
          {t('common:restart')}
        </Button>
      </>}
    />
  </>;
};