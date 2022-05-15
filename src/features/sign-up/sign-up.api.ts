import { SignUp } from '../../model/sign-up';
import { appPost, baseUrl } from '../api';

/*
  I am ignoring the fact that the password will be sent in plain text across an unsecure
  connection as the mock backend is not using https etc. (Assuming intended simplicity).
*/
export const postSignUp = (
  SignUpData: SignUp
): Promise<true> => appPost(`${baseUrl}submit`, SignUpData).then(() => true);