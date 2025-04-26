import axios from "axios";
import Cookies from 'js-cookie'


const createAuthSlice = (set, get) => ({
    user: null,
    isAuthenticated: false,
  
    login: async (credentials) => {
      const url = 'http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/login';

      const response = await axios.post(url, credentials, {
        headers: {
          'Accept':        'application/json',
          'Content-Type':  'application/json',
          'X-CSRF-TOKEN':  '',   // keep empty if your backend expects it but you’re not using it
        },
      });
      console.log('Login success:', response.data);
      const user = response.data.data.user
      const token = response.data.data.token.value
  
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('auth_token', token, { expires: 30 })
      console.log("Zuzstand slice", user)
      const zustand_user = JSON.stringify(user)
      console.log("Zuzstand slice another", zustand_user)
  
      set({ user: user, isAuthenticated: true });
    },
  
    logout: async (token) => {
      const url = 'http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/logout';
      const response = await axios.post(url, {},{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('user');
      Cookies.remove('auth_token', { path: '/' })
      
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
        set({ user: updatedUser });

        // Save updated user info to localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        set({ user: updatedUser });
      } catch (err) {
        throw err
        console.error('Failed to update user:', err);
      }
    },

    deleteUser: async (token) => {
        // /${get().user.id}
      try {
        const res = await axios.delete(`http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/delete/profile/${get().user.id}`, updatedData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

  
        // set({ user: updatedUser });
      } catch (err) {
        throw err
      }
    }
  });
  

  export default createAuthSlice;