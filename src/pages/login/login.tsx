import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';
import { getUser, loginUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userSelector = useSelector((state) => state.user);

  const error = userSelector.error || '';
  const loading = userSelector.loading;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }))
      .unwrap()
      .then((payload) => {
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
        dispatch(getUser());
      });
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
