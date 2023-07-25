import axios from "axios";
import { useState } from "react";
import "./uploadfile.css";
import UploadImage from "./Frame 2.png";
const Uploadfile = ({ Contract, Provider, Account }) => {
  const [File, setFile] = useState(null);
  const [Filename, setFilename] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (File) {
      try{
      const formData = new FormData();
        formData.append("file", File);
        formData.append("filename", File.name); 
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: "dbf24bccf7acb8afc1c7",
              pinata_secret_api_key:
                "1e984160f5a1963086e7380f910f48df0fd89d5f75a2d86181e3065a2d4e67db",
            },
          }
        );
        console.log(resFile);
        const IpfsHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log("got the hash " + IpfsHash);
        await Contract.add(Account, IpfsHash);
        alert("Successfully uploaded the file");
        setFilename("No file selected");
        setFile(null);
        console.log("done");
      } catch (error) {
        console.error(error);
        alert("Unable to upload the file to Pinata: " + error);
      }

    }
  };

  const retriveFile = async (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFilename(data.name);
    console.log(data);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label className="choose" htmlFor="file-upload">
          <img src={UploadImage} alt="Upload" className="upload-image" />
        </label>
        <input
          disabled={!Account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retriveFile}
        />
        <span className="textArea">Selected File: {Filename}</span>
        <button type="submit" className="upload" disabled={!File}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Uploadfile;
