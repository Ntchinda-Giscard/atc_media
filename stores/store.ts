// store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createPersistedAuthSlice } from './authSlice';
import createClientSlice, { ClientSlice } from './clientSlice';

type StoreState = AuthSlice & ClientSlice;

const useStore = create<StoreState>()(
  devtools((set, get, store) => ({
    ...createPersistedAuthSlice(set, get, store),  // brings in user, login, logout…
    ...createClientSlice(set, get, store),          // brings in clients, fetchClients…
  }))
);

export default useStore;