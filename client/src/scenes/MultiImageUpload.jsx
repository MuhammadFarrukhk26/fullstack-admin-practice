import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
//import './MultiImageUpload.css'; // Custom CSS file
import '../scenes/MultiImageUpload.css'
const MultiImageUpload = () => {
  const [images, setImages] = useState(['']);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div className="upload-container">
      <h2>Upload Product Images</h2>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag & drop images here, or click to select files</p>
        )}
      </div>

      <div className="preview-container">
        {images?.map((image, index) => (
          <div className="preview" key={index}>
            <img src={image?.preview} alt={`preview-${index}`} />
            <button className="remove-btn" onClick={() => removeImage(index)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
