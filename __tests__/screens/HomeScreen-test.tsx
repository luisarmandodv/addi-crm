import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '@screens/dashboard/HomeScreen';
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const fakeData = {
  users: [
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', image: 'john.jpg' },
    // Add more fake user data as needed
  ],
};

jest.mock('@hooks/useGetUsers', () => ({
  useGetUsers: () => ({
    data: fakeData,
  }),
}));

describe('HomeScreen component', () => {
  const client = new QueryClient();

  it('Should render correctly component', () => {
    render(
      <QueryClientProvider client={client}>
        <HomeScreen />
      </QueryClientProvider>
    );
  });

  it('Should render snapshot', () => {
    // expect(tree).toMatchSnapshot();
    render(
      <QueryClientProvider client={client}>
        <HomeScreen />
      </QueryClientProvider>
    );


    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('renders loading indicator when isLoading is true', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={client}>
        <HomeScreen />
      </QueryClientProvider>);
    const loader = getByTestId('loader');
    expect(loader).toBeTruthy();
  });

  it('renders sections and items when data is available', async () => {

    const { findByText } = render(
      <QueryClientProvider client={client}>
        <HomeScreen />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(findByText('Leads')).toBeTruthy();
      expect(findByText('John Doe')).toBeTruthy();
      expect(findByText('john@example.com')).toBeTruthy();
    });
  });

  it('calls navigate when an item is pressed', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={client}>
        <HomeScreen />
      </QueryClientProvider>);
    const item = getByTestId('button'); // Replace with the name of an actual item
    fireEvent.press(item);

    expect(mockedNavigate).toHaveBeenCalledWith('UserDetails', { user: expect.any(Object), section: 'Leads' });
  });
});
