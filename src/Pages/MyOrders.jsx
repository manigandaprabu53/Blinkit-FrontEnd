import React from 'react';
import { useSelector } from 'react-redux';
import NoData from "../Components/NoData";
function MyOrders() {

  const orders = useSelector(state => state.orders.order);


  return (
    <div className='p-2'>
      <div className='bg-white shadow-md w-full mb-5 p-3'>
        <h1>orders</h1>
      </div>

      {
        !orders[0] && (
          <NoData/>
        )
      }

      {
        orders?.map((order, index)=>{
          return  (
            <div key={order._id+index+order} className='border rounded p-4 text-sm my-3 bg-blue-50'>
              <p>Order NO: {order?.orderId}</p>
              <div className='flex gap-3'>
                <img src={order?.product_details?.image[0]} alt="" className='w-14 h-14' />
                <p className='font-medium'>Name: {order?.product_details?.name}</p>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default MyOrders