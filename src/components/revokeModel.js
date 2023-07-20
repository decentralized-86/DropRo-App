import React, { useState } from "react";
import './revokemodel.css'; // Use the same CSS file as Modal

const RevokeModel = ({ setmodalRevoke, Contract }) => {
    const [addressInput, setAddressInput] = useState("");

    const handleAddressInputChange = (event) => {
        setAddressInput(event.target.value);
    };

    const handleRevoke = async () => {
        const address = addressInput.trim();
        if (address) {
            await Contract.disallow(address);
            alert(`Revoked access to address: ${address}`);
        }
    }

    return (
        <div className="modalContainer">
            <div className="title">Revoke From</div>
            <div className="body">
                <input
                    type="text"
                    className="address"
                    placeholder="Enter Address"
                    value={addressInput}
                    onChange={handleAddressInputChange}
                />
            </div>
            <div className="footer">
                <button onClick={() => {setmodalRevoke(false)}} id="cancelBtn">
                    Cancel
                </button>
                <button onClick={handleRevoke}>Revoke</button>
            </div>
        </div>
    );
};

export default RevokeModel;
