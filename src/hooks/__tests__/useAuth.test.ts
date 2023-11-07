import { useAuth } from '../useAuth';
import useAuthenticatedStore from '@stores/useAuthenticatedStore';

jest.mock('@stores/useAuthenticatedStore');

describe('useAuth', () => {
    it('should return the correct initial state', () => {
        // Mock the implementation of useAuthenticatedStore
        useAuthenticatedStore.mockReturnValue({ isAuthenticated: true, setIsAuthenticated: jest.fn() });

        // Call the useAuth function to get the initial state
        const authState = useAuth();

        // Assert that the initial state is correct
        expect(authState.isAuthenticated).toBe(true);
    });

    it('should return the correct setIsAuthenticated function', () => {
        // Mock the implementation of useAuthenticatedStore
        const setIsAuthenticatedMock = jest.fn();
        useAuthenticatedStore.mockReturnValue({ isAuthenticated: true, setIsAuthenticated: setIsAuthenticatedMock });

        // Call the useAuth function to get the setIsAuthenticated function
        const authState = useAuth();

        // Assert that the setIsAuthenticated function is the same as the one returned by useAuthenticatedStore
        expect(authState.setIsAuthenticated).toBe(setIsAuthenticatedMock);
    });
});
