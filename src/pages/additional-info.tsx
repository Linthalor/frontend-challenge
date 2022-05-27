import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { SignUpCard } from '../components/signup-card';
import { selectUserPrefsValues, setUserPrefsValues } from '../features/sign-up/sign-up.slice';
import { SignUpUserPrefsValues } from '../model/sign-up';
import { mapValues } from 'lodash';
import { required } from '../validators/required.validator';
import { getColorsAsync, selectColors } from '../features/color/color.slice';
import { useSelector } from 'react-redux';
import { isError, isLoading, isValue } from '../model/util/async-prop';
import { isTrue } from '../validators/is-true.validator';
import { TermsAndConditions, TermsAndConditionsRef } from '../components/terms-and-conditions';

type SignUpPrefsFormErrors = {
  [K in keyof SignUpUserPrefsValues]?: string;
};

type SignUpPrefsForm = {
  [K in keyof SignUpUserPrefsValues]: {
    value: SignUpUserPrefsValues[K],
    dirty: boolean,
  };
};

export const AdditionalInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signUpPrefsData = useSelector(selectUserPrefsValues);
  const [formValues, setFormValues] = useState<SignUpPrefsForm>({
    color: {
      value: signUpPrefsData?.color || '',
      dirty: signUpPrefsData?.color ? true : false,
    },
    terms: {
      value: signUpPrefsData?.terms ? signUpPrefsData.terms : false,
      dirty: signUpPrefsData?.terms ? true : false,
    },
  });
  const colors = useSelector(selectColors);
  const termsRef = useRef<TermsAndConditionsRef | null>(null);

  useEffect(() => {
    /*
      This could potentially be moved to a higher level so it fetches at app load and
      not every time this section of the form is visited. For the sake of demoing
      the async nature of colors, it will be left as is.
     */
    dispatch(getColorsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (
    key: keyof SignUpUserPrefsValues
  ) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues(prev => ({...prev, [key]: { value: event.target.value, dirty: true }}));
  };

  const setCheckboxValue = (
    key: keyof SignUpUserPrefsValues
  ) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues(prev => ({...prev, [key]: { value: event.target.checked, dirty: true }}));
  };

  const formValidationErrors = useMemo<SignUpPrefsFormErrors>(() => ({
    ...(formValues.color.dirty && (
      required('color', formValues.color.value)
    )),
    ...(formValues.terms.dirty && (
      isTrue(
        'terms',
        formValues.terms.value,
        'You must agree to the Terms & Conditions to continue.'
      )
    )),
  }), [formValues]);
  const invalidForm = useMemo(() => {
    const formFields = Object.values(formValues);
    return Object.keys(formValidationErrors).length > 0
      || formFields.filter(field => field.dirty).length !== formFields.length; 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValidationErrors]); // Intentially not depending on formValues

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const userFormValues = mapValues(formValues, (value) => value.value) as SignUpUserPrefsValues;
    dispatch(setUserPrefsValues(userFormValues));
    navigate('/confirmation');
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
            Additional Info
          </Typography>
          <TextField
            id="favorite-color-select-field"
            label="Favorite Color"
            variant="outlined"
            select
            value={formValues.color.value}
            error={!!formValidationErrors.color || isError(colors)}
            helperText={formValidationErrors.color
              || (isError(colors) && 'Failed to load colors.')
              || ' '
            }
            onChange={setValue('color')}
            required
            InputProps={{
              ...(isLoading(colors) && {
                startAdornment: (
                  <InputAdornment position="start">
                    <CircularProgress size={16} />
                  </InputAdornment>
                )
              })
            }}
          >
              {isLoading(colors) && [1,2,3,4,5].map(id => 
                <MenuItem key={id} disabled>
                  <Skeleton variant='text' sx={{width: '100%'}}/>
                </MenuItem>
              )}
              {isError(colors) && <MenuItem disabled>Failed to load colors.</MenuItem>}
              {isValue(colors) && colors.value.map(color =>
                <MenuItem key={color} value={color}>{color}</MenuItem>
              )}
          </TextField>
          <FormControlLabel
            label={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Typography>I Agree to</Typography>
                <Button
                  onClick={() => termsRef.current?.setOpenTerms(true)}
                >
                  Terms & Conditions
                </Button>
              </Box>
            }
            control={
              <Checkbox
                checked={formValues.terms.value}
                onChange={setCheckboxValue('terms')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
        </>}
        actions={<>
          <Button variant="outlined" color="secondary" component={Link} to="/sign-up">Back</Button>
          <Button variant="contained" type="submit" disabled={invalidForm}>Next</Button>
        </>}
      />
      <TermsAndConditions ref={termsRef}/>
    </form>
  );
};