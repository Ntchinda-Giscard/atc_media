// stores/store.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createAuthSlice from './authSlice';
import createClientSlice from './clientSlice';

import { persist, createJSONStorage } from "zustand/middleware";

// import createSettingsSlice from './settingsSlice';

const useStore = create(
  persist(
    (...a) => ({
  ...createAuthSlice(...a),
  ...createClientSlice(...a),
//   ...createSettingsSlice(set, get),
}),
  {
    name: 'bound-store'
  }
)
);

export default useStore;