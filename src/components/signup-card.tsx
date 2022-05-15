import { Box, Card, CardActions, CardContent, useMediaQuery } from '@mui/material';
import { theme } from '../app/theme';

export const SignUpCard = ({
  content,
  actions
}: {
  content: JSX.Element,
  actions: JSX.Element
}) => {
  const fullscreenSignUpCardMediaQuery = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: fullscreenSignUpCardMediaQuery ? '100%' : 400,
          height: fullscreenSignUpCardMediaQuery ? '100%' : 'unset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'start',
            gap: 1,
            flex: fullscreenSignUpCardMediaQuery ? 0 : 1,
          }}
        >
          {content}
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            gap: 1,
          }}
        >
          {actions}
        </CardActions>
      </Card>
    </Box>
  );
};