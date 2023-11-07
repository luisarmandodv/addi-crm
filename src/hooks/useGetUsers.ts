import { Alert } from 'react-native';
import { api } from '@services/axios';
import { useQuery } from 'react-query';
import useClientsStore from '@stores/useClientsStore';
import { UserData } from 'src/types';

interface UsersData {
  users: UserData[];
}

async function getUsers(): Promise<UsersData> {
  return await api
    .get<UsersData>('https://dummyjson.com/users', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function useGetUsers() {
  const setLeads = useClientsStore((state) => state.setLeads);

  return useQuery<UsersData, boolean>({
    queryFn: getUsers,
    queryKey: 'getUsers',
    onSuccess: (data) => {
      setLeads(data.users[0]);
      return data;
    },
    onError: (error: any) => {
      Alert.alert('Ops!', error);
    },
  });
}
