import React from 'react'
import NoDataImage from "../assets/NoDataImage.jpg";

function NoData() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img 
          src={NoDataImage} 
          alt="No Data"
          className='w-36'
        />
        <p className='text-neutral-700'>No Data Found</p>
    </div>
  )
}

export default NoData