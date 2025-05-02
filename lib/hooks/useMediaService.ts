import { IAddFileToFolderApiProps, IAddPlaylistToFolderApiProps, IUpdateFileInFolderApiProps } from "@/constant/interphase";
import api from "./useApi";

const useMediaService = () => {
    const addFolderApi = async (payload: { name: string, parent_id: number | null }) => {
        try {
            const response = await api.post('folders', payload);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const getFolders = async () => {
        try {
            const response = await api.get('folders');
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const getFolder = async (id: number) => {
        try {
            const response = await api.get('folders/' + id);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const renameFolderApi = async (id: number, name: string) => {
        try {
            const response = await api.put('folders/' + id, {
                name: name
            });
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const deleteFolderApi = async (id: number) => {
        try {
            const response = await api.delete('folders/' + id);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const addFileToFolderApi = async (payload: IAddFileToFolderApiProps) => {
        try {
            const response = await api.post('files/upload', { ...payload, multipart: true });
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const removeFileFromFolderApi = async (id: number) => {
        try {
            const response = await api.delete('files/' + id);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const addPlaylistToFolderApi = async (payload: IAddPlaylistToFolderApiProps) => {
        try {
            const response = await api.post('playlists', payload);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const updateFileInFolderApi = async (payload: IUpdateFileInFolderApiProps) => {
        try {
            const response = await api.put('files/' + payload.file_id.toString(), payload);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    const deletePlaylistApi = async (id: number) => {
        try {
            const response = await api.delete('playlists/' + id);
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    return { getFolders, getFolder, renameFolderApi, addFolderApi, deleteFolderApi, deletePlaylistApi, addFileToFolderApi, removeFileFromFolderApi, addPlaylistToFolderApi, updateFileInFolderApi }
}
export default useMediaService;