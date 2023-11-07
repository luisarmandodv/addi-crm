import { Alert } from 'react-native';
import { useQuery, UseQueryResult } from 'react-query';

interface NationalRegistryIdentificationData {
  meetsRequirements: boolean;
}

const getNationalRegistryIdentification =
  async (): Promise<NationalRegistryIdentificationData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          meetsRequirements: Boolean(Math.random() < 0.8),
        });
      }, Math.random() * 2000);
    });
  };

export function useGetNRI(
  enableRandom?: boolean
): UseQueryResult<NationalRegistryIdentificationData> {
  return useQuery<NationalRegistryIdentificationData, Error>({
    queryKey: 'nationalRegistryIdentification',
    queryFn: getNationalRegistryIdentification,
    onSuccess: (data) => {
      if (enableRandom) return data;
      return {
        meetsRequirements: true,
      };
    },
    onError: (error: Error) => {
      Alert.alert('Ops!', error.message);
    },
  });
}
