import React from 'react'
import {useDropzone} from 'react-dropzone';
const Dropzone = () => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
  return (
    <section className="container">
    <div {...getRootProps({className: 'dropzone'})}>
      <p>Dropzone without click events</p>
    </div>
    <aside>
      <h4>Files</h4>
      <ul>{files}</ul>
    </aside>
  </section>
  );
}

export default Dropzone
