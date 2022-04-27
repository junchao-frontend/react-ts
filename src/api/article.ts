import axios from '@/utils/request'
import { AxiosPromise } from 'axios'
// 获取频道列表
export const getChannels = (params?: any): AxiosPromise => {
  return axios.request({
    url: '/channels',
    method: 'GET',
    params,
  })
}
// 获取表格数据
export const getTabels = (params?: any): AxiosPromise => {
  return axios.request({
    url: '/mp/articles',
    method: 'GET',
    params,
  })
}

export const deleteArticle = (id?: number): AxiosPromise => {
  return axios.request({
    url: `/mp/articles/${id}`,
    method: 'delete',
  })
}
