import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
    <>
    <Header/>
    <main className='min-h-[80vh]'>

      <div className='m-2 w-full max-w-md bg-red-200 p-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-red-800 font-bold text-lg text-center'>Order Cancelled</p>
        <Link to="/home" className='border border-red-500 px-4 py-1 text-red-900 hover:bg-red-500 hover:text-white transition-all'>Go To Home</Link>
      </div>
    
    </main>

    <Footer/>
    </>
  )
}

export default Cancel