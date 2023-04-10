import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
const fileTypes = ["JPEG", "PNG", "GIF"];
const DragAndDrop = () => {
  const [file, setFile] = useState(null);
 

  const handleChange = async(file) => {
    setFile(file);
    const formData = new FormData();
    formData.append('image',file)
    await axios.post('http://localhost:5000/upload',formData )
    .then((res) => {
      console.log('File uploaded successfully:', res.data.filename);
    })
    .catch((err) => {
      console.error('Error uploading file:', err);
    });
    
   
  };

  return (
    <div className="App">
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
    </div>
  );
};

export default DragAndDrop;
