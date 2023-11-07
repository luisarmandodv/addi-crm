import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { HomeScreen } from '@screens/dashboard/HomeScreen';
import { colors } from '@theme/colors';
import useModal from '@stores/useModal';
import { UserDetails } from '@screens/dashboard/UserDetails';
import { UserData } from 'src/types';

type AuthRoutes = {
  HomeScreen: undefined;
  UserDetails: {
    user: UserData;
    section: string;
  };
};

export type AuthNavigatorRoutesprops = NativeStackScreenProps<AuthRoutes>;

const Stack = createNativeStackNavigator<AuthRoutes>();

export function DashboardRoutes() {
  const setIsModalVisible = useModal((state) => state.setIsModalVisible);

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '',
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{ marginRight: 20 }}
            >
              <FontAwesome name="plus" size={24} color={colors.primaryBlack} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
