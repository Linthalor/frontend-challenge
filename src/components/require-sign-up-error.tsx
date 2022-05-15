import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectSignUpStatus } from '../features/sign-up/sign-up.slice';
import { isError } from '../model/util/async-prop';

export const RequireSignUpError = ({
  children,
  redirectTo,
}: {
  children: JSX.Element,
  redirectTo: string,
}) => {
  const signUpStatus = useAppSelector(selectSignUpStatus);
  if (isError(signUpStatus)) {
    return children;
  }
  return <Navigate to={redirectTo} replace />;
};