import React from "react";

function Modal(props) {

  const handleClose = (e) => {
    props.hideModal()
  }
console.log(props)
//based on https://www.tailwindcsscomponent.com/very-simple-modal
  return (
    <div className={`absolute  w-full h-full flex items-center justify-center bg-slate-800 bg-opacity-50 transform scale-0 transition-transform duration-300 ${props.display} backdrop-blur-xl inset-0 z-40 rounded-lg`} onClick={handleClose}>
      <div className="backdrop-opacity-100 bg-slate-900 shadow-lg backdrop-filter-none border-slate-700 border-solid border rounded-lg w-1/3 h-1/3 p-12">
        <h2 className="text-md font-semibold">
          The assignment that broke me and was left unfinished
        </h2>
        <p>
          <a href="https://github.com/Srafington/COMP-4513-A1" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub </a>
        </p>
      </div>
    </div>
  )
}

export default Modal;
