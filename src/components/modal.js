import "./modal.css";
import { useEffect, useState } from "react";

const Modal = ({ setModelOpen, Contract }) => {
  const sharing = async()=>{
      const address = document.querySelector(".address").value;
      const share = await Contract.allow(address);
      share.wait(1);
      alert("Successfully Shared to the address "+address)
      
  }
  useEffect(()=>{
    const accessList = async ()=>{
      const addressList = await Contract.shareAccess();
      console.log(addressList);
      let select = document.querySelector("#selectnumber");
      const options = addressList;
      for(let i=0;i<options.length;i++){
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    }
    sharing && accessList();
  }, []) // Empty dependency array added here
  
  
  return (
    <div className="modalContainer">
      <div className="title">Share with</div>
      <div className="body">
        <input
          type="text"
          className="address"
          placeholder="Enter Address"
        ></input>
      </div>
      <form id="myForm">
        <select id="selectnumber">
            <option className="address">People with Access</option>
        </select>
      </form>
      <div className="footer">
        <button onClick={() => {setModelOpen(false)}} id="cancelBtn">
            Cancel
        </button>
        <button onClick={sharing}>Share</button>
      </div>
    </div>
  );
};

export default Modal;
