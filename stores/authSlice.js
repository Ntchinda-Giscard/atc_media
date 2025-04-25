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
  
    updateUser: async (updatedData, token) => {
        // /${get().user.id}
      try {
        const res = await axios.put(`http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/updated/${get().user.id}`, updatedData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

  
        const updatedUser = res.data.data; // Assuming res.data.data contains the updated user object
        // set({ user: updatedUser });

        // Save updated user info to localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        // set({ user: updatedUser });
      } catch (err) {
        throw err
        console.error('Failed to update user:', err);
      }
    }
  });
  

  export default createAuthSlice;