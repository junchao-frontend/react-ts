import axios from '@/utils/request'
import { AxiosPromise } from 'axios'
export const getUser = (params?: any): AxiosPromise => {
  return axios.request({
    url: '/user/profile',
    method: 'GET',
    params,
  })
}
