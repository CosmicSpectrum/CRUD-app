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
        }).catch(err=>{
            console.error(err);
            return false;
        })
    }
}