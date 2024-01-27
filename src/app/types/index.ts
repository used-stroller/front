interface FilterReq {
  keyword?: string
  sourceType?: sourceType[]
  minPrice?: number
  maxPrice?: number
  town?: string
  period?: number
  model?: string[]
  brand?: string[]
  page?: number
  size?: number
}

enum sourceType {
  NAVER = 'NAVER',
  CARROT = 'CARROT',
  HELLO = 'HELLO',
  BUNJANG = 'BUNJANG',
  JUNGGO = 'JUNGGO',
}

interface ProductRes {
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

interface Content {
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
  etc: string
  uploadDate: string
  address: string
  region: string
  content: string
}

interface Sort {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

export type {
  FilterReq,
  sourceType,
  ProductRes,
  Content,
  Sort
}
