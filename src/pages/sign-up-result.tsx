import { Check, Error } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { SignUpCard } from '../components/signup-card';
import { resetSignUp } from '../features/sign-up/sign-up.slice';

export const SignupResult = ({ success }: { success?: true }) => {
  const dispatch = useAppDispatch();

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
          {success ? 'Success!' : 'Error'}
        </Typography>
        <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {success 
            ? <Check fontSize="large" color="primary" sx={{ mr: 1 }} />
            : <Error fontSize="large" color="error" sx={{ mr: 1 }} />
          }
          {success
            ? 'You should receive a confirmation email soon.'
            : 'Uh oh, something went wrong. Please try again later.'
          }
        </Typography>
      </>}
      actions={<>
        <Button variant="contained" type="submit" onClick={restart}>Restart</Button>
      </>}
    />
  </>;
};