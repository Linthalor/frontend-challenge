import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { SignUpCard } from '../components/signup-card';
import { selectUserPrefsValues, setUserPrefsValues } from '../features/sign-up/sign-up.slice';
import { SignUpUserPrefsValues, SignUpUserPrefsValuesSchema } from '../model/sign-up';
import { useSelector } from 'react-redux';
import { isError, isLoading, isValue } from '../model/util/async-prop';
import { TermsAndConditions, TermsAndConditionsRef } from '../components/terms-and-conditions';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getColorsAsync, selectColors } from '../features/color/color.slice';

export const AdditionalInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const colors = useSelector(selectColors);
  const termsRef = useRef<TermsAndConditionsRef | null>(null);
  const signUpPrefsData = useSelector(selectUserPrefsValues);

  useEffect(() => {
    /*
      This could potentially be moved to a higher level so it fetches at app load and
      not every time this section of the form is visited, or use a caching strategy
      to prevent reloading it if it's not been updated.
      
      For the sake of demoing the async nature of colors, it will be left as is.
     */
    dispatch(getColorsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit, register, formState, control, watch } = useForm({
    resolver: zodResolver(SignUpUserPrefsValuesSchema),
    mode: 'onChange',
    defaultValues: {
      color: signUpPrefsData?.color || '',
      terms: signUpPrefsData?.terms || false,
    },
  });
  const { errors } = formState;

  const submitForm = (values: SignUpUserPrefsValues) => {
    dispatch(setUserPrefsValues(values));
    navigate('/confirmation');
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
            {t('page:additionalInfo:label')}
          </Typography>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.color?.message}>
                <InputLabel id="favorite-color-select-field-label" required>{t('form:color:label')}</InputLabel>
                <Select
                  id="favorite-color-select-field"
                  label={t('form:color:label')}
                  required
                  endAdornment={isLoading(colors) && (
                    <InputAdornment position="end" sx={{ mr: '-7px' }}>
                      <CircularProgress size={24} />
                    </InputAdornment>
                  )}
                  {...field}
                >
                  {isLoading(colors) && <MenuItem value={watch('color')}>{watch('color')}</MenuItem>}
                  {isLoading(colors) && [1,2,3,4,5].map(id => 
                    <MenuItem key={id} disabled>
                      <Skeleton variant='text' sx={{width: '100%'}}/>
                    </MenuItem>
                  )}
                  {isError(colors) && <MenuItem disabled>{t('form:color:errors:failed_async')}</MenuItem>}
                  {isValue(colors) && colors.value.map(color =>
                    <MenuItem key={color} value={color}>{color}</MenuItem>
                  )}
                </Select>
                <FormHelperText>{errors.color?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <FormControlLabel
            control={
              <Checkbox {...register('terms')} checked={watch('terms')} />
            }
            label={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Typography>{t('common:terms:agree')}</Typography>
                <Button
                  onClick={() => termsRef.current?.setOpenTerms(true)}
                >
                  {t('common:terms:termsAndConditions')}
                </Button>
              </Box>
            }
          />
        </>}
        actions={<>
          <Button variant="outlined" color="secondary" component={Link} to="/sign-up">
            {t('common:back')}
          </Button>
          <Button variant="contained" type="submit" disabled={!formState.isValid}>
            {t('common:next')}
          </Button>
        </>}
      />
      <TermsAndConditions ref={termsRef}/>
    </form>
  );
};