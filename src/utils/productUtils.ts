import type { FilterReq, ProductRes } from '@/app/types'
import axios from 'axios'

export const getProductList = async (filter: FilterReq): Promise<axios.AxiosResponse<ProductRes> | void> => {
  const requestUrl = 'http://localhost:8090/product/list' + createQueryParams(filter)
  console.log('filter: ', filter, '\nrequestUrl: ', requestUrl)
  const res = axios.get(requestUrl, { withCredentials: true })

  return await res.then((res) => {
    // console.log('res.data: ', res.data)
    return res.data
  }).catch((error) => {
    console.error('API error: ', error)
    throw new Error('상품정보를 가져올 수 없습니다.')
  })
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
