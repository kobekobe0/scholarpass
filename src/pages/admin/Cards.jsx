import React from 'react'
import CardsCollection from '../../components/admin/Cards'

function Cards() {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex justify-between gap-4 flex-col'>
            <CardsCollection/>
        </div>
    </div>
  )
}

export default Cards