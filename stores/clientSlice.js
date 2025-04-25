import axios from "axios";

const createClientSlice = (set) => ({
    clients: [],
  
    fetchClients: async (token) => {
        try{
            const res = await axios.get('http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager',{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        set({ clients: res.data.data.data});
        }catch(error){
            throw error
        }
      
    },
  
    addClients: async (data, token) => {
        try{
            const res = await axios.post('http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager', data,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            set((state) => ({ clients: [...state.clients, res.data.data] }));
        }catch(error){
            throw error
        }
      
    },

    updateClient: async (data, id, token) => {
        const res = await axios.put(`http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager/${id}`, data,{
          headers:{
              "Authorization": `Bearer ${token}`
          }
        });
        set((state) => ({ clients: [...state.clients, res.data.data] }));
    },

    deleteClient: async (data, id, token) => {
        const res = await axios.delete(`http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager/${id}`,{
          headers:{
              "Authorization": `Bearer ${token}`
          }
        });
        set((state) => ({ clients: [...state.clients, res.data.data] }));
    }
    
  });
  export default createClientSlice;
  