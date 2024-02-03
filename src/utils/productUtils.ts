import type { FilterReq, ProductRes } from '@/app/types'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8080/product',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
})
axiosClient.interceptors.response.use(
  function (response) {
    return response.status === 200 && response.data
  },
  async function (error) {
    return await Promise.reject(error)
  }
)

export const getProductList = async (filter: FilterReq): Promise<axios.AxiosResponse<ProductRes> | void> => {
  console.log('filter: ', filter)
  const queryParams = createQueryParams(filter)
  return await axiosClient.get(`/list${queryParams}`)
}

export const getImageUrl = (imgSrc: string): string => {
  return imgSrc.startsWith('http') ? imgSrc : '/images/default_thumbnail.svg'
}

export const createQueryParams = (filter: FilterReq): string => {
  const params = new URLSearchParams()
  Object.keys(filter).forEach((key) => {
    params.append(key, filter[key])
  })
  return `?${params.toString()}`
}
