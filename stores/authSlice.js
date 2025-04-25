import axios from "axios";
const createAuthSlice = (set, get) => ({
    user: null,
    isAuthenticated: false,
  
    initAuthFromLocalStorage: () => {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            set({ user: parsedUser, isAuthenticated: true });
          }
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
        }
      },
  
    login: async (credentials) => {

      const user = { id: 1, name: 'Jean', email: credentials.email };
  
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      set({ user, isAuthenticated: true });
    },
  
    logout: () => {
      localStorage.removeItem('user');
      set({ user: null, isAuthenticated: false });
    },
  
    updateUser: async (updatedData) => {
      try {
        const res = await axios.put(`http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/updated/${get().user.id}`, updatedData);
  
        const updatedUser = {
          ...get().user,
          ...res.data
        };
  
        // Save updated info to localStorage too
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        set({ user: updatedUser });
      } catch (err) {
        console.error('Failed to update user:', err);
      }
    }
  });
  

  export default createAuthSlice;