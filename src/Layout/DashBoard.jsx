import React from 'react'
import Header from "../Components/Header";
import UserMenu from '../Components/UserMenu';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';

function DashBoard() {

  const user = useSelector(state => state.user);

  return (
    <>
        <Header/>
        <section className='bg-white'>
          <div className="container mx-auto p-3 lg:grid grid-cols-[250px,1fr]">
            {/* Left part is menu */}
            <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r'>
              <UserMenu/>
            </div>


            {/* Right part is content */} 
            <div className='bg-white min-h-[76vh]'>
              <Outlet/>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  )
}

export default DashBoard