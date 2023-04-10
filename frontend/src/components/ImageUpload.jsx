import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendEmail from "./SendEmail";
import Link from "./Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
function ImageUpload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState();
  const [uuid,setUuid] = useState()
console.log(uuid)
  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:5000/upload", formData)
      .then((res) => {
        console.log(res.data.file,res.data);
        setLink(res.data.file);
        setUuid(res.data.uuid)
        const notify = () => toast("file is uploaded");
        notify();
      })

      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  return (
    <section>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <button type="submit">Upload</button>
        <ToastContainer />
      </form>

      <Link link={link} />
      <SendEmail uuid={uuid} />
    </section>
  );
}

export default ImageUpload;
