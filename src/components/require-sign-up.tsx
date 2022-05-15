import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectSignUpStatus } from '../features/sign-up/sign-up.slice';
import { isValue } from '../model/util/async-prop';

export const RequireSignUp = ({
  children,
  redirectTo,
}: {
  children: JSX.Element,
  redirectTo: string,
}) => {
  const signUpStatus = useAppSelector(selectSignUpStatus);
  if (isValue(signUpStatus)) {
    return children;
  }
  return <Navigate to={redirectTo} replace />;
};