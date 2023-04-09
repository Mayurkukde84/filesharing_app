import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    axios.post('http://localhost:5000/upload',formData )
      .then((res) => {
        console.log('File uploaded successfully:', res.data.filename);
      })
      .catch((err) => {
        console.error('Error uploading file:', err);
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUpload;

