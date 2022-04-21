import axios from '@/axios/axios'

export function getToplistDetail() {
    return axios.get('/toplist/detail')
}