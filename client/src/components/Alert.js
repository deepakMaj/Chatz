import React from 'react';
import close from '../assets/images/close.svg';

const Alert = ({ message }) => {

  const closeAlert = () => {
    const alert = document.getElementById("alertMsg");
    alert.classList.replace("showAlert", "removeAlert");
    setTimeout(() => alert.remove(), 900);
  }

  return (
    <div className="position-absolute card showAlert" id="alertMsg">
      <div className="d-flex justify-content-center align-items-start" >
        <p className="text-white mr-2">{message}</p>
        <img src={close} alt="" id="closeBtn" onClick={closeAlert} />
      </div>
    </div>
  )
}

export default Alert;
