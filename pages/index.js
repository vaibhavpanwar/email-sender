import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import cogoToast from "cogo-toast";
export default function contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const sendEmail = async () => {
    if (!message || !name || !email) {
      cogoToast.warn("Invalid data", {
        hideAfter: 4,
        heading: "Please fill required fields!",
        position: "top-right",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        setLoading(true);
        const formData = { name, email, message };
        await axios.post("/api/hello", formData, config);
        setLoading(false);

        cogoToast.success("Yayy!!", {
          hideAfter: 4,
          heading: "Response have been submitted!",
          position: "top-right",
        });

        clearForm();
      } catch (error) {
        setLoading(false);
        cogoToast.error("Something went wrong", {
          hideAfter: 4,
          heading: '"Failed!! please try later',
          position: "top-right",
        });

        clearForm();
      }
    }
  };
  return (
    <StyledBlogFormContainer>
      <StyledBlogFormHeading>Contact Me!</StyledBlogFormHeading>

      <StyledBlogFormInput
        type="text"
        name="name"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledBlogFormInput
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledBlogFormInput
        type="text"
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <StyledBlogFormButton disabled={loading} onClick={sendEmail}>
        {loading ? "SUBMITTING.." : "SUBMIT"}
      </StyledBlogFormButton>
    </StyledBlogFormContainer>
  );
}

const StyledBlogFormContainer = styled.div`
  max-width: 55rem;
  margin: 9rem auto;
  border: 2px solid #e3dede;
  border-radius: 5px;
  padding: 25px;
  box-sizing: border-box;
`;

const StyledBlogFormHeading = styled.h1`
  font-size: 35px;
  padding: 10px 175px;
  margin: auto;
  text-align: center;
  font-weight: 800;

  @media (max-width: 1080px) {
    padding: 4px 50px;
  }
`;

const StyledBlogFormInput = styled.input`
  display: block;
  width: 95%;
  height: 1.6rem;
  font-size: 16px;
  color: rgba(29, 29, 29, 0.7);
  padding: 35px;
  outline: none;
  border: 1.5px solid #e3dede;
`;

const StyledBlogFormButton = styled.button`
  display: block;
  width: 95%;
  padding: 20px;
  margin: 2rem auto;
  background: #fff;
  border: 1.5px solid black;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  font-size: 20px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #e3dede;
  }
`;
