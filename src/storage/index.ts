import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (value: string, key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const clear = async (): Promise<void> => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
