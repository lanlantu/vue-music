import axios from '@/axios/axios'
const api= '/api'
const test='/test'

export function getToplistDetail() {
    return axios.get(api+'/toplist/detail')
}

export function getTest() {
   return axios.get(test+"/hello");
}