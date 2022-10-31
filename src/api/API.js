import axios from "axios";


export const API = {
    getUsers (count = 10, page = 1003) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${count}&page=${page}`)
            .then((response) => response.data)
    }
}
