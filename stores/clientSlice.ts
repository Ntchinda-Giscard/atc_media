import axios from "axios";
import { StateCreator } from "zustand";

export interface Client {
  id: number;
  name: string;
  email: string;
  // Add any other fields your client object has
}

export interface ClientSlice {
  clients: Client[];
  fetchClients: (token: string) => Promise<void>;
  addClients: (data: Partial<Client>, token: string) => Promise<void>;
  updateClient: (data: Partial<Client>, id: number, token: string) => Promise<void>;
  deleteClient: (id: number, token: string) => Promise<void>;
}

// Type-safe Zustand slice
const createClientSlice: StateCreator<
  ClientSlice,
  [],
  [],
  ClientSlice
> = (set, get, store) => ({
  clients: [],

  fetchClients: async (token) => {
    try {
      const res = await axios.get<{ data: { data: Client[] } }>(
        "http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ clients: res.data.data.data });
    } catch (error) {
      throw error;
    }
  },

  addClients: async (data, token) => {
    try {
      const res = await axios.post<{ data: Client }>(
        "http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ clients: [...state.clients, res.data.data] }));
    } catch (error) {
      throw error;
    }
  },

  updateClient: async (data, id, token) => {
    try {
      const res = await axios.put<{ data: Client }>(
        `http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        clients: state.clients.map((client) =>
          client.id === id ? res.data.data : client
        ),
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteClient: async (id, token) => {
    try {
      await axios.delete(
        `http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/admin/manager/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
});

export default createClientSlice;