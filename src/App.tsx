import { Navigate, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/sign-up';
import { AdditionalInfo } from './pages/additional-info';
import { Confirmation } from './pages/confirmation';
import { SignupResult } from './pages/sign-up-result';
import { RequireSignUp } from './components/require-sign-up';
import { RequireSignUpError } from './components/require-sign-up-error';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      {/*
        TODO: make it so you have to progress successfully to each route along the
        path before being able to get to the next? I.E. route guard based on form data.
      */}
      <Route path="/more-info" element={<AdditionalInfo />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/success" element={<RequireSignUp redirectTo="/"><SignupResult success /></RequireSignUp>} />
      <Route path="/error" element={<RequireSignUpError redirectTo="/"><SignupResult /></RequireSignUpError>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
