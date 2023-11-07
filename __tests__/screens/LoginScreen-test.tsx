import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '@screens/auth/LoginScreen';
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock('@expo/vector-icons', () => ({
    FontAwesome: '',
    Feather: '',
}));

jest.mock('expo-linear-gradient', () => ({
    LinearGradient: '',
}));

describe('LoginScreen component', () => {
    const client = new QueryClient();

    it('Should render correctly component', () => {
        render(
            <QueryClientProvider client={client}>
                <LoginScreen />
            </QueryClientProvider>
        );
    });

    it('Should render snapshot', () => {
        render(
            <QueryClientProvider client={client}>
                <LoginScreen />
            </QueryClientProvider>
        );

        expect(screen.toJSON()).toMatchSnapshot();
    });
});
