// stores/store.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createAuthSlice from './authSlice';
// import createCartSlice from './cartSlice';
// import createSettingsSlice from './settingsSlice';

const useStore = create(devtools((set, get) => ({
  ...createAuthSlice(set, get),
//   ...createCartSlice(set, get),
//   ...createSettingsSlice(set, get),
})));

export default useStore;
