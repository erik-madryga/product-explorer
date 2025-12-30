import { create } from 'zustand';
import { fetchUsers } from '../lib/fakeStoreApi';
import { User } from '../components/User/user.types';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  clearUsers: () => set({ user: null }),
}));