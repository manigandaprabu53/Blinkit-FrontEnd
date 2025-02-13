import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link, useLocation } from 'react-router-dom'

function Success() {

  const location = useLocation();
  console.log("Location: ", location)

  return (
    <>
      <Header/>
      
      <main className='min-h-[80vh]'>
        <div className='m-2 w-full max-w-md bg-green-200 p-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
          <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location.state.text : "Payment"} Successfull</p>
          <Link to="/home" className='border border-green-500 px-4 py-1 text-green-900 hover:bg-green-500 hover:text-white transition-all'>Go To Home</Link>
        </div>
      </main>

      <Footer/>
    </>
  )
}

export default Success