
import api from "./useApi";


const useFileService = () => {
    const getFiles = async () => {
        try {
            const response = await api.get('files');
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }
    return {
        getFiles
    }
}

export default useFileService;