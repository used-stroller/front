import type { Response } from '../app/types/index'

export const getProductList = async ({ filter }): Promise<Response> => {
  let requestUrl = 'http://localhost:8090/product/list'
  filter && console.log('filter', filter)
  filter && Object.keys(filter).forEach((key, index) => {
    if (index === 0) {
      requestUrl += '?'
    } else {
      requestUrl += '&'
    }
    requestUrl += `${key}=${filter[key]}`
  })
  console.log('requestUrl', requestUrl)
  const res = await fetch(requestUrl)

  if (!res.ok) {
    if (!res.ok) throw new Error('상품정보를 가져올 수 없습니다.')
  }
  return await res.json()
}

export function getImageUrl(imgSrc: string): string {
  return imgSrc.startsWith('http') ? imgSrc : '/images/default_thumbnail.svg';
}
