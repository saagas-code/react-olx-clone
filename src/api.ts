import axios from "axios";
import { off } from "process";

export const nodeApi = {
    
    getAll: async (id: number) => {
        let response = await axios.get("http://localhost:8819/tasks?userId="+id);
        return response.data
    },
    
    Login: async ( email: string, password: string ) => {
        let response = await axios.post("http://localhost:8819/user/signin", {
            email, password
        });
        return response.data
    },

    Register: async ( name: string, email: string, password: string, idState: number ) => {
        let response = await axios.post("http://localhost:8819/user/signup", {
            name, email, password, idState
        });
        return response.data
    },

    Request: async ( token: string ) => {
        let response = await axios.get("http://localhost:8819/request");
        return response.data
    },

    getStates: async () => {
        let response = await axios.get("http://localhost:8819/states");
        return response.data
    },
    getCategories: async () => {
        let response = await axios.get("http://localhost:8819/categories");
        return response.data
    },
    getAds: async (sort: string, limit: number, q?: string, cat?: string, state?: string, offset?: number) => {
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }
        if(offset) {
            queryString.push(`offset=${offset}`);
        }
        let response = await axios.get
        (`http://localhost:8819/ad/list?sort=${sort}&limit=${limit}&${queryString.join('&')}`);
        return response.data
    },
    getAd: async (id: number) => {
        let response = await axios.get
        (`http://localhost:8819/ad/${id}`);
        return response.data
    },
    addAd: async (fData: FormData) => {
        let response = await axios.post
        (`http://localhost:8819/ad/add`, fData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data
    },
    editAd: async (fData: FormData, id: number) => {
        let response = await axios.post
        (`http://localhost:8819/ad/${id}`, fData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data
    },
    DeleteAd: async (id: number) => {
        let response = await axios.post
        (`http://localhost:8819/ad`, {
            id
        });
        return response.data
    },

    //ACCOUNT
    AccountInfo: async (id: number) => {
        let response = await axios.get
        (`http://localhost:8819/user/me?id=${id}`);
        return response.data
    },
    EditAccount: async (id: number, name?: string, email?: string, idState?: string) => {
        let response = await axios.post
        (`http://localhost:8819/user/me`, {
            id, name, email, idState
        });
        return response.data
    },






    //IMAGES
    deleteImage: async (id: number, idAd: number, idUser: number) => {
        let response = await axios.post(`http://localhost:8819/images/delete`, {
            id, idAd, idUser
        });
        return response.data
    }
}

