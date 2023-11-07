import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { UserDetails } from '@screens/dashboard/UserDetails';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('@hooks/useGetNRI', () => ({
  useGetNRI: () => ({
    data: {},
  }),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MockedMaterialCommunityIcons');

describe('UserDetails Component', () => {
  const client = new QueryClient();

  it('Should render correctly component', () => {
    const user = {
      image: 'user-image-url',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      address: { city: 'New York' },
      phone: '123-456-7890',
      email: 'johndoe@example.com',
    };

    const section = 'Leads';
    render(
      <QueryClientProvider client={client}>
        <UserDetails route={{ params: { user, section } }} />
      </QueryClientProvider>
    );
  });

  it('Should render snapshot', () => {
    const user = {
      image: 'user-image-url',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      address: { city: 'New York' },
      phone: '123-456-7890',
      email: 'johndoe@example.com',
    };

    const section = 'Leads';
    render(
      <QueryClientProvider client={client}>
        <UserDetails route={{ params: { user, section } }} />
      </QueryClientProvider>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with user data', () => {
    const user = {
      image: 'user-image-url',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      address: { city: 'New York' },
      phone: '123-456-7890',
      email: 'johndoe@example.com',
    };

    const section = 'Leads';
    const { getByText, getByTestId } = render(
      <QueryClientProvider client={client}>
        <UserDetails route={{ params: { user, section } }} />
      </QueryClientProvider>
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('New York')).toBeTruthy();
  });

  it('renders correctly with section "Leads"', () => {
    const user = {
      image: 'user-image-url',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      address: { city: 'New York' },
      phone: '123-456-7890',
      email: 'johndoe@example.com',
    };

    const section = 'Leads';
    const { getByTestId } = render(
      <UserDetails route={{ params: { user, section } }} />
    );

    expect(getByTestId('national-registry-identification-loader')).toBeTruthy();
    expect(getByTestId('judicial-records-loader')).toBeTruthy();
  });
});
