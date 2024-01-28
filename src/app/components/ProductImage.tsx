import Image from 'next/image'
import { getImageUrl } from '@/utils/productUtils'
import React from 'react'

const ProductImage = ({ content }): JSX.Element => {
  const [image, setImage] = React.useState(getImageUrl(content.imgSrc))
  const handleError = (): void => {
    setImage('/images/default_thumbnail.svg')
  }
  return (
    <Image
      src={image}
      alt={content.title}
      fill
      sizes={'(max-width: 600px) 220px, 220px'}
      onError={handleError}
    />
  )
}

export default ProductImage
