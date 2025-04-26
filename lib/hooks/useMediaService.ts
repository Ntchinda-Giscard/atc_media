import api from "./useApi";

const useMediaService = () => {
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
    return { getFolders, getFolder, renameFolderApi }
}
export default useMediaService;