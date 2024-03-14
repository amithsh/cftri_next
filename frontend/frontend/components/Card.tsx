import Image from 'next/image'
import React from 'react'


interface CardProps{
    src:string
}
const Card:React.FC<CardProps> = ({
    src
}) => {
  return (
    <div className='w-full h-96'>
        <Image src={src} alt={src} fill/>
    </div>
  )
}

export default Card