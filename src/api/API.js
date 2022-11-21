import axios from "axios";
import {createThunkGetCaptcha} from "../redux-toolkit/reducers/authReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '88900306-6752-429d-be83-bed3f47ce301'
    }
})

export const API = {
    getUsers(displayedUsersCount, page, userName) {
        return instance.get(`users?count=${displayedUsersCount}&page=${page}&term=${userName}`)
            .then((response) => response.data)
    },
    getDataAuthMe() {
        return instance.get(`auth/me`).then((response) => {
            return response.data.data
        })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then((response) => {
            return response.data
        })
    },
    getProfileInfo(userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data
        })
    },
    setStatus(status) {
        return instance.put(`profile/status`, {
            status
        }).then((response) => {
            return response.data
        })
    },
    authorizeUser({email, password, rememberMe, captcha}) {
        return instance.post(`auth/login`, {
            email, password, rememberMe, captcha
        }).then((response) => {
            return response.data.resultCode
        })
    },
    signOut() {
        return instance.delete(`auth/login`).then((response) => {
            return response.data.resultCode
        })
    },
    sendProfileForm(data) {
        return instance.put(`profile`, {...data}).then((response) => {
            return response.data.resultCode
        })
    },
    setPhoto(photo) {
        return instance.put(`profile/photo`, {photo}, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            return response.data
        })
    },
    follow(userId) {
        return instance.post(`/follow/${userId}`)
            .then((response) => response.data.resultCode)
    },
    unfollow(userId) {
        return instance.delete(`/follow/${userId}`)
            .then((response) => response.data.resultCode)
    },
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
            .then((response) => response.data.url)
    },
    dialogs: {
        getAllDialogs() {
            return instance.get(`dialogs`)
                .then((response) => response.data)
        },
        startChatting(userId) {
            return instance.put(`dialogs/${userId}`)
                .then((response) => response.data.resultCode)
        },
        getListMessages(userId, page, count) { //get list of messages with your friend
            return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`)
                .then((response) => response.data)
        },
        sendMessage(userId, message) {
            return instance.post(`dialogs/${userId}/messages`, {body: message})
                .then((response) => response.data)
        },
        getInfoAboutViewedMessage(messageId) {
            return instance.get(`dialogs/messages/${messageId}/viewed`)
                .then((response) => response.data)
        },
    }
}
