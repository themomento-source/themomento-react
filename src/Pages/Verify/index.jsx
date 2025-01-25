import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  // Handle OTP submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    console.log("OTP Verified: ", otp);
    navigate("/change-password"); // Redirect to change password page
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <h3 className="text-center text-xl font-bold text-gray-800">
          Verify Your Account
        </h3>
        <p className="text-center text-gray-500 text-sm mt-1">
          Enter the 6-digit OTP sent to your email.
        </p>
        <form className="mt-5" onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="otp"
            id="otp"
            label="Enter OTP"
            variant="outlined"
            className="w-full"
            value={otp}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            inputProps={{ maxLength: 6, pattern: "\\d*" }}
          />
          <Button
            type="submit"
            className="w-full py-3 mt-4 text-white font-bold rounded-md"
            style={{ background: "linear-gradient(45deg, #007BFF, #0056b3)" }}
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Verify;
