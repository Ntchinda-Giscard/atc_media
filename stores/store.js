// stores/store.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createAuthSlice from './authSlice';
import createClientSlice from './clientSlice';
// import createSettingsSlice from './settingsSlice';

const useStore = create(devtools((set, get) => ({
  ...createAuthSlice(set, get),
  ...createClientSlice(set, get),
//   ...createSettingsSlice(set, get),
})));

export default useStore;
