import React from 'react'
import Image from 'next/image'

export default function Loading (): JSX.Element {
  return (
    <Image
      src='/images/loading.svg'
      alt='loading'
      width={50}
      height={50}
    />
  )
}
