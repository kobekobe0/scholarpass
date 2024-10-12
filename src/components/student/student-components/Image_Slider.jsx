import React from 'react'
import img1 from '../../../assets/1.webp'
import img2 from '../../../assets/2.webp'
import img3 from '../../../assets/3.webp'
import img4 from '../../../assets/4.webp'
import img5 from '../../../assets/5.webp'

function Image_Slider() {
  return (
    <div className='flex overflow-hidden space-x-16'>
        <div className='flex space-x-16 animate-loop-scroll'>
            <img src={img1} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img2} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img3} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img4} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img5} loading='lazy' className='max-w-none h-[350px]' alt="" />
        </div>
        <div className='flex space-x-16 animate-loop-scroll' aria-hidden='true'>
            <img src={img1} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img2} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img3} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img4} loading='lazy' className='max-w-none h-[350px]' alt="" />
            <img src={img5} loading='lazy' className='max-w-none h-[350px]' alt="" />
        </div>
    </div>
  )
}

export default Image_Slider