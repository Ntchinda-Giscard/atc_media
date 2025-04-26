import axios from 'axios';
import { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  role: Array<any>
}

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>, token: string) => Promise<void>;
  deleteUser: (token: string) => Promise<void>;
}

// Define your slice as a pure function
const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/persist', unknown]],
  [],
  AuthSlice
> = (set, get, store) => ({
  user: null,
  isAuthenticated: false,

login: async (credentials) => {
    const user = { id: 1, name: 'Jean', email: credentials.email, role: [] };
    set({ user, isAuthenticated: true });
},

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateUser: async (updatedData, token) => {
    try {
      const res = await axios.put(
        `http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/updated/${get().user?.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = res.data.data;
      set({ user: updatedUser });
    } catch (err) {
      console.error('Failed to update user:', err);
      throw err;
    }
  },

  deleteUser: async (token) => {
    try {
      await axios.delete(
        `http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/delete/profile/${get().user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error('Failed to delete user:', err);
      throw err;
    }
  },
});

// Export the slice wrapped in `persist`
export const createPersistedAuthSlice = persist(createAuthSlice, {
  name: 'auth-storage', // key in localStorage
  partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
});