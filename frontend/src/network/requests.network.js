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
    
    static read(skip, limit){
        return axios.get(`${this.#baseUrl}/users/read?skip=${skip}&limit=${limit}`, {withCredentials: true})
        .then(res=>{
            return res.data.users
        })
    }
}