import React from 'react';
import './card.css';
import galleryImg from './gallery.png';
import documentImg from './document.png';
import pdfImg from './pdf.png';

const Card = ({ file }) => {
    const isImage = file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png");
    const isPDF = file.endsWith(".pdf");
    let fileIcon = null;

    if (isImage) {
        fileIcon = <img src={galleryImg} alt="Image Icon" className="file-icon" />;
    } else if (isPDF) {
        fileIcon = <img src={pdfImg} alt="PDF Icon" className="file-icon" />;
    } else {
        fileIcon = <img src={documentImg} alt="Document Icon" className="file-icon" />;
    }

    // Function to shorten filename
    const shortenFileName = (name) => {
        if (name.length > 10) {
            return name.substring(0, 4) + "..." + name.substring(name.length - 4, name.length);
        }
        return name;
    };

    // Get filename from file path and shorten it
    const fileName = file.substring(file.lastIndexOf("/") + 1);
    const shortFileName = shortenFileName(fileName);

    return (
        <div className="file-card">
            <a
                href={`https://gateway.pinata.cloud/ipfs/${file.substring(6)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {fileIcon}
            </a>
            <p>{shortFileName}</p>
        </div>
    );
};

export default Card;
