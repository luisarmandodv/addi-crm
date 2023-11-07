import { Alert } from 'react-native';
import { useQuery, UseQueryResult } from 'react-query';

interface PropspectQualifications {
  qualification: number;
}

function getRandomNumber(min: number, max: number): number {
  const randomNumber: number = Math.random();
  const scaledNumber: number = Math.floor(randomNumber * (max - min + 1)) + min;

  return scaledNumber;
}

const getPropspectQualifications = (): Promise<PropspectQualifications> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        qualification: getRandomNumber(50, 100),
      });
    }, Math.random() * 2000);
  });
};

export function useProspectQualification(): UseQueryResult<PropspectQualifications> {
  return useQuery<PropspectQualifications, any>({
    queryFn: getPropspectQualifications,
    queryKey: 'prospectQualifications',
    onSuccess: (data) => {
      return data;
    },
    onError: (error: any) => {
      Alert.alert('Ops!', error);
    },
  });
}
