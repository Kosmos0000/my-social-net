import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY':  '88900306-6752-429d-be83-bed3f47ce301'
}
})


export const API = {
    getUsers (displayedUsersCount, page, userName = null) {
        if (userName) {
            return instance.get(`users?count=${displayedUsersCount}&page=${page}&term=${userName}`)
                .then((response) => response.data)
        } else {
            return instance.get(`users?count=${displayedUsersCount}&page=${page}`)
                .then((response) => response.data)
        }
    },
    getDataAuthMe () {
        return instance.get(`auth/me`).then((response) => {
            return response.data.data
        })
    },
    getStatus (userId) {
        return instance.get(`profile/status/${userId}`).then((response) => {
            return response.data
        })
    },
    getProfileInfo (userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data
        })
    },
    setStatus (status) {
        return instance.put(`profile/status`,{
            status
        }).then((response) => {
            return response.data
        })
    },
    authorizeUser ({email, password, rememberMe}) {
        return instance.post(`auth/login`,{
            email, password, rememberMe
        }).then((response) => {
            return response.data.resultCode
        })
    },
    signOut () {
        return instance.delete(`auth/login`).then((response) => {
            return response.data.resultCode
        })
    },
    sendProfileForm (data) {
        return instance.put(`profile`, {...data}).then((response) => {
            return response.data.resultCode
        })
    },
}
