import React from 'react'

function CardLoading() {
  return (
    <div className='border lg:min-w-48 lg:p-4 grid gap-2 lg:gap-3 min-w-36 rounded py-2 bg-white animate-pulse'>
        <div className='min-h-24 bg-blue-50 rounded'></div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'></div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded'></div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'></div>

        <div className='flex items-center justify-between gap-3'>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'></div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'></div>
        </div>
    </div>
  )
}

export default CardLoading