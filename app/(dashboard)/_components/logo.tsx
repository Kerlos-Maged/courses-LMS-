import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
      width={120}
      height={120}
      alt='Logo'
      src={'/logo.svg'}
    />
  )
}

export default Logo