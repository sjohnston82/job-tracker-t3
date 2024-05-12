import React from 'react'

const FloatingButton = () => {
  return (
    <div className="floating-button w-64 h-16 fixed rounded-full top-4 mx-auto bg-white text-slate-600 border-black border-2 shadow ">
      <div className="flex justify-around">
        <button className="">Add New Job App</button>
        <button className="">View Archived</button>
      </div>
    </div>
  )
}

export default FloatingButton