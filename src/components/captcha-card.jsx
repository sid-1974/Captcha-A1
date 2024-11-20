import React, { useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Card = () => {
  const [username, setUsername] = useState("");
  const [displayedUsername, setDisplayedUsername] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState(""); // State to hold the input for captcha verification
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const [coins, setCoins] = useState(0); // State for displaying coins
  const [showRazorpay, setShowRazorpay] = useState(false); // State to track whether Razorpay should be shown

  // Function to generate a random captcha with 6 to 12 characters
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 7) + 6; // Random length between 6 and 12
    let captcha = "";
    for (let i = 0; i < length; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  // Handle "Get Captcha" button click
  const handleGetCaptcha = () => {
    if (username.trim() === "") {
      setErrorMessage("Please enter your name to get the captcha.");
    } else {
      setErrorMessage(""); // Clear any previous error message
      setDisplayedUsername(username);
      setCaptcha(generateCaptcha());
      setUsername(""); // Clear the username field after clicking Get Captcha
      setShowRazorpay(true); // Show Razorpay container after captcha is generated
      setSuccessMessage(""); // Clear any success message
    }
  };

  // Handle "Submit" button click (once captcha is generated)
  const handleSubmit = () => {
    if (captchaInput !== captcha) {
      setErrorMessage("Error verifying captcha. Please try again.");
      setSuccessMessage(""); // Clear success message if there's an error
    } else {
      setErrorMessage(""); // Clear error message if everything is fine
      setSuccessMessage("Captcha verified successfully!"); // Set success message
      console.log("Captcha submitted:", captcha);
      setCoins(coins + 10); // Increase coin balance by 10 after correct captcha
      setCaptcha(generateCaptcha()); // Generate a new captcha after successful submission
      setCaptchaInput(""); // Clear captcha input field for the new captcha
    }
  };

  return (
    <div className="card-container">
      {displayedUsername && <h2>User: {displayedUsername}</h2>}

      {captcha && (
        <div className="captcha-display">
          <h3>{captcha}</h3>
        </div>
      )}

      <input
        type="text"
        placeholder={captcha ? "Enter captcha" : "Enter your user name"} // Change placeholder based on captcha
        value={captcha ? captchaInput : username} // Bind appropriate state to the input field
        onChange={(e) =>
          captcha ? setCaptchaInput(e.target.value) : setUsername(e.target.value)
        } // Update the corresponding state
        className="username-input"
      />

      <button onClick={captcha ? handleSubmit : handleGetCaptcha} className="button">
        {captcha ? "Submit" : "Get Captcha"}
      </button>

      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Coins and Razorpay containers placed side by side */}
      <div className="coins-and-razorpay">
        {/* Dollar container */}
        {coins >= 0 && (
          <div className="coins-container">
            <i class="fa-sharp fa-solid fa-dollar-sign"></i>
            <p className="coin-amount">{coins}</p>
          </div>
        )}

        {/* Razorpay container - shown after Get Captcha */}
        {showRazorpay && (
          <div className="razorpay-container">
           <i class="fa-brands fa-paypal"></i>
            <p className="razorpay-text">Razorpay</p>
          </div>
        )}
      </div>

      {/* Refer & Earn Button */}
      <button className="button">Refer & Earn</button>

      <p className="instructions">
        *All words are case sensitive.<br />
        *Calculative Captchas must be solved.<br />
        *Length of Captcha will be between 6 to 12 characters.
      </p>
    </div>
  );
};

export default Card;
