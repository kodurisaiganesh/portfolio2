import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentSEO = SEO.find((item) => item.page === "contact");

  // Form states
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !contactEmail || !message || !loginEmail || !loginPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Handle form submission (API call or whatever)
    alert(
      `Contact info:\nName: ${name}\nEmail: ${contactEmail}\nMessage: ${message}\n\nLogin info:\nEmail: ${loginEmail}\nPassword: ${loginPassword}`
    );

    // Optionally reset form fields
    setName("");
    setContactEmail("");
    setMessage("");
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <>
      <Helmet>
        <title>{`Contact | ${INFO.main.title}`}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords.join(", ")} />
      </Helmet>

      <div className="page-content">
        <NavBar active="contact" />
        <div className="content-wrapper">
          <div className="contact-container">
            <div className="title contact-title">
              Let's Get in Touch: Ways to Connect with Me
            </div>

            <form className="contact-login-form" onSubmit={handleSubmit}>
              {/* Contact Us fields */}
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />

              <label htmlFor="contactEmail">Email:</label>
              <input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Your email address"
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                rows={5}
                required
              ></textarea>

              <hr style={{ margin: "20px 0" }} />

              {/* Login fields */}
              

              {error && <p className="error-message">{error}</p>}

              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="socials-container">
            <div className="contact-socials">
              <Socials />
            </div>
          </div>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
