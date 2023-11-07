import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from './src/routes';
import { colors } from '@theme/colors';

const queryClient = new QueryClient();

export default function App() {
  const handleNotification = () => {
    console.warn(
      'Notification will run, but not will show up in the app, until close'
    );
  };

  const askNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (Constants.isDevice && status === 'granted')
      console.log('Notifications permissions granted');
  };


  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['juficialRecords', 'nationalRegistryIdentification'],
    });
  }, []);


  useEffect(() => {
    askNotification();
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);

  LogBox.ignoreAllLogs();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <StatusBar style="light" backgroundColor={colors.primary} translucent />
    </QueryClientProvider>
  );
}
