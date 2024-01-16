export interface Response {
  content: Content[]
  number: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  sort: Sort
  first: boolean
  empty: boolean
}

export interface Content {
  id: number
  sourceType: string
  pid: string
  title: string
  price: number
  link: string
  imgSrc: string
  createdAt: string
  updatedAt: string
  releaseYear: number
  etc: any
  uploadDate: string
  address: string
  region: any
  content: any
}

export interface Sort {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

export const getProductList = async (page:number) : Promise<Response>=> {
    const res = await fetch(`http://localhost:8090/product/list?page=${page}`,{credentials: 'include'})
    if(!res.ok){
        if(!res.ok) throw new Error('상품정보를 가져올 수 없습니다.')
    }
    return res.json()
  }