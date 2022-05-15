import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import terms from '../terms';

export interface TermsAndConditionsRef {
  setOpenTerms: React.Dispatch<React.SetStateAction<boolean>>
}

export const TermsAndConditions = forwardRef((_: {}, ref: Ref<TermsAndConditionsRef>) => {
  const [openTerms, setOpenTerms] = useState(false);
  useImperativeHandle(ref, () => ({ setOpenTerms }));
  return (
    <Modal
      open={openTerms}
      onClose={() => setOpenTerms(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        // TODO: use media queries to make this go full screen on small devices
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 800,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent
          sx={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            flex: 1
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Terms & Conditions
          </Typography>
          <Box sx={{ mt: 2, overflowY: 'auto', flex: 1 }}>
            <Typography id="modal-modal-description" sx={{ whiteSpace: 'pre-wrap' }}>
              {terms}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
          }}
        >
          <Button onClick={() => setOpenTerms(false)}>Close</Button>
        </CardActions>
      </Card>
    </Modal>
  );
});