import React from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/modal"

function Header(props) {
  const [showModal, setShowModal] = React.useState(
    
  );

  const handleOpen = (e) => {
    setShowModal("scale-100")
  }
  const handleClose = (e) => {
    setShowModal("")
  }

  return (
    <div className="flex place-content-between shadow-lg m-4 border-slate-700 border-solid border rounded-lg p-2">
            <Modal display={showModal} hideModal={handleClose}></Modal>
      <span>
        <Link to="/">
          <i className="fa-solid fa-clapperboard text-6xl"></i>
        </Link>
      </span>
      <span><button onClick={handleOpen} className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" >About</button></span>
    </div >
  );
}

export default Header;
