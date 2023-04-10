import axios from "axios";
import React, { useState } from "react";

const SendEmail = (props) => {
  const uuid = props.uuid;
  const [email, setEmail] = useState({
    emailTo: "",
    emailForm: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmail((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(uuid, "uuid");
    const { emailTo, emailForm } = email;
    console.log(emailTo, emailForm);

    axios
      .post("http://localhost:5000/api/files/send", {
        emailTo,
        emailForm,
        uuid,
      })
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        name="emailTo"
        placeholder="enter email to"
        onChange={onChangeHandler}
        value={email.emailTo}
      />
      <input
        name="emailForm"
        placeholder="enter email Form"
        onChange={onChangeHandler}
        value={email.emailForm}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendEmail;
