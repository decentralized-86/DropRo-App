import React, { useState } from "react";
import "./Display.css";
import Card from './card'

const Display = ({ Contract, setDisplay }) => {
  const [Data, setData] = useState([]);
  const [addressInput, setAddressInput] = useState("");

  const handleAddressInputChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  const handleGetData = async () => {
    let getData;
    const address = addressInput.trim();
    console.log(address)

    if (address) {
      try {
        getData = await Contract.display(address);
      } catch (e) {
        console.log(e);
      }
    }
    console.log(getData)
    const isEmpty = Object.keys(getData).length === 0;
    console.log(isEmpty);
    if (!isEmpty) {
      const string = getData.toString();
      const string_arr = string.split(",");
      const files = string_arr.map((item, i) => (
        <Card key={i} file={item.substring(item.lastIndexOf("/") + 1)} />
      ));
      setData(files);
    } else {
      alert("No data to display");
    }
  };

  return (
    <div className="display-container">
      {Data.length === 0 ? (
        <>
          <input
            type="text"
            placeholder="Enter Address"
            className="address"
            value={addressInput}
            onChange={handleAddressInputChange}
          />
          <div className="button-container">
            <button className="button" onClick={handleGetData}>
              Get Data
            </button>
          </div>
        </>
      ) : (
        <div className="file-list">{Data}</div>
      )}
      <div className="button-container">
        <button className="button" onClick={handleCancel} id="cancelBtn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Display;
