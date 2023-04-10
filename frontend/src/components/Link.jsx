import React,{useState} from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
const Link = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      };
    
  return (
    <>
    
    <p>{props.link}</p>
    
    <CopyToClipboard text={props.link} onCopy={onCopyText}>
        <div className="copy-area">
          <button>Copy to Clipboard</button>
          <span className={`copy-feedback ${isCopied ? "active" : ""}`}>
            Copied!
          </span>
        </div>
      </CopyToClipboard>
    </>
  )
}

export default Link