import useAuthenticatedStore from '@stores/useAuthenticatedStore';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export function useAuth(): AuthState {
  const { isAuthenticated, setIsAuthenticated } = useAuthenticatedStore();

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
}
