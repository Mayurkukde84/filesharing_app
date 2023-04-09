import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
const fileTypes = ["JPEG", "PNG", "GIF"];
const DragAndDrop = () => {
  const [file, setFile] = useState(null);
 

  const handleChange = async(file) => {
    setFile(file);
    console.log(file)
    
    fetch("http://localhost:5000/upload", {
      mode: 'no-cors',
      method: "POST",
      body: data
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
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
