import React from 'react'
import CardsCollection from '../../components/admin/Cards'
import CardDesignList from '../../components/admin/CardDesign'

function CardDesign() {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex justify-between gap-4 flex-col'>
            <CardDesignList/>
        </div>
    </div>
  )
}

export default CardDesign