import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { postData } from "../../utils/api.js";

function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError(""); // Clear error when user types valid input
    }
  };

  // Handle OTP submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP length
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await postData("/api/user/verifyemail", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      });

      if (response.success) {
        console.log("OTP Verified:", otp);
        localStorage.removeItem("userEmail");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
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
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Verify;
