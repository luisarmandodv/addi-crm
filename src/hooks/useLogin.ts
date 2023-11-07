import { Alert } from 'react-native';
import { api } from '@services/axios';
import { useMutation } from 'react-query';
import { useAuth } from './useAuth';
import { setItem } from '@storage/index';
import { LoginResponse } from 'src/types';

type LoginProps = {
  email: string;
  password: string;
};

async function login({ email, password }: LoginProps): Promise<LoginResponse> {
  return await api
    .post(
      'https://dummyjson.com/auth/login',
      {
        username: email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data);
}

export function useLogin() {
  const { setIsAuthenticated } = useAuth();

  return useMutation<LoginResponse, any, LoginProps>({
    mutationFn: login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setItem(data.token, 'token');
    },
    onError: (error: any) => {
      Alert.alert('Ops!', error.response.data.message);
    },
  });
}
