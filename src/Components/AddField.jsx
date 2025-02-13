import React from 'react'
import { IoClose } from 'react-icons/io5'

function AddField({close, value, onchange, submit}) {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-70 z-50 flex justify-center items-center'>
        <div className='bg-white rounded p-4 w-full max-w-md'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <input type="text" 
                className='bg-blue-50 border outline-none focus-within:border-primary-200 p-2 rounded w-full my-3'
                placeholder='Enter Filed Name'
                value={value}
                onChange={onchange}
            />

            <button
                onClick={submit}
                className='bg-primary-100 hover:bg-primary-200 px-4 py-2 rounded mx-auto w-fit block'
            >
                Add Field
            </button>
        </div>
    </section>
  )
}

export default AddField