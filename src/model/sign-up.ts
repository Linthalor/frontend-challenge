import { z } from 'zod';
import { t } from 'i18next';

const minNameSize = 1;
const nameMessages = (t('form:name:errors', { returnObjects: true }) as any)(minNameSize);

const minPasswordSize = 8;
const passwordMessages = (t('form:name:errors', { returnObjects: true }) as any)(minPasswordSize);

export const SignUpUserFormValuesSchema = z.object({
  name: z.string({
    required_error: nameMessages.required_error,
  }).min(minNameSize, nameMessages.too_small),
  email: z.string({
    required_error: t('form:email:errors:required_error'),
  }).email(t('form:email:errors:invalid_string')),
  password: z.string({
    required_error: passwordMessages.required_error,
  }).min(minPasswordSize, passwordMessages.too_small),
});
export type SignUpUserFormValues = z.infer<typeof SignUpUserFormValuesSchema>;

// Used to effectively prevent an empty selection.
const minColorSize = 1;

export const SignUpUserPrefsValuesSchema = z.object({
  // TODO: have this fetch the redux's value to compare for validation? might need a component to do that...
  color: z.string({
    required_error: t('form:color:errors:required_error'),
  }).min(minColorSize),
  terms: z.boolean().refine(val => val, {}),
});
export type SignUpUserPrefsValues = z.infer<typeof SignUpUserPrefsValuesSchema>;

export type SignUp = SignUpUserFormValues & SignUpUserPrefsValues;