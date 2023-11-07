import { Alert } from 'react-native';
import { useQuery, UseQueryResult } from 'react-query';

interface JudicialRecords {
  meetsRequirements: boolean;
}

const getJudicialRecords = (): Promise<JudicialRecords> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        meetsRequirements: Boolean(Math.random() < 0.8),
      });
    }, Math.random() * 1000);
  });
};

export function useJudicialRecords(
  enableRandom?: boolean
): UseQueryResult<JudicialRecords> {
  return useQuery<JudicialRecords, any>({
    queryFn: getJudicialRecords,
    queryKey: 'juficialRecords',
    onSuccess: (data) => {
      if (enableRandom) return data;
      return {
        meetsRequirements: true,
      };
    },
    onError: (error: any) => {
      Alert.alert('Ops!', error);
    },
  });
}
