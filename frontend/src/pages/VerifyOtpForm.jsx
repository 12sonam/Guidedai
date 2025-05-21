// VerifyOtpForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function VerifyOtpForm({ email }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v2/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      setMessage("Logged in successfully!");
    } catch (err) {
      setMessage("OTP verification failed");
    }
  };

  return (
    <div>
      <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={verifyOtp}>Verify & Login</button>
      <p>{message}</p>
    </div>
  );
}
