import type { FilterReq, Response } from '../app/types/index'
import axios from 'axios'

export const getProductList = async (filter: FilterReq): Promise<Response> => {
  const requestUrl = 'http://localhost:8090/product/list' + createQueryParams(filter)
  console.log('requestUrl', requestUrl)
  const res = axios.get(requestUrl, { withCredentials: true })

  return await res.then((res) => {
    // console.log('res.data: ', res.data)
    return res.data
  }).catch((error) => {
    console.log('error: ', error)
    throw new Error('상품정보를 가져올 수 없습니다.')
  })
}

export function getImageUrl (imgSrc: string): string {
  return imgSrc.startsWith('http') ? imgSrc : '/images/default_thumbnail.svg'
}

export function createQueryParams (filter: FilterReq): string {
  const params = new URLSearchParams()
  Object.keys(filter).forEach((key) => {
    params.append(key, filter[key])
  })
  return `?${params.toString()}`
}
