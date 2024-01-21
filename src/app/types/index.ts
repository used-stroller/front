interface Response {
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

interface Filter {
  page: number
  size: number
}

export type {
  Response,
  Content,
  Sort,
  Filter
};