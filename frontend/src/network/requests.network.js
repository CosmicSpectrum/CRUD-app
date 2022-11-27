import axios from 'axios';

export default class RequestsGate{
    static #baseUrl = 'http://localhost:8080';

    static login(loginData){
        return axios.post(`${this.#baseUrl}/auth/login`, loginData, {withCredentials: true}).then(res=>{
            return res.data
        })
    }

    static me(){
        return axios.get(`${this.#baseUrl}/auth/me`, {withCredentials: true}).then(res=>{
            return res.data;
        })
    }
    
    static read(){
        return axios.get(`${this.#baseUrl}/users/read`, {withCredentials: true})
        .then(res=>{
            return res.data.users
        })
    }

    static create(row){
        return axios.post(`${this.#baseUrl}/users/create`, row, {withCredentials: true})
        .then(res=>{
            return res.data;
        })
    }

    static update(row){
        return axios.patch(`${this.#baseUrl}/users/update`, row, {withCredentials: true}).then(res=>{
            return res.data;
        })
    }

    static delete(rowId){
        return axios.delete(`${this.#baseUrl}/users/delete?_id=${rowId}`, {withCredentials: true}).then(res=>{
            return res.data;
        })
    }
}