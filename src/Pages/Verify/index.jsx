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
  // Updated handleSubmit in Verify component
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionType = localStorage.getItem("actionType");
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail || otp.length !== 6) {
      setError("Invalid verification request");
      return;
    }
  
    setLoading(true);
  
    try {
      // Determine endpoint based on action type
      const endpoint = actionType === "forgot-password" 
        ? "/api/user/verify-otp" 
        : "/api/user/verifyemail";
  
      const response = await postData(endpoint, {
        email: userEmail,
        otp,
      });
  
      if (response.success) {
        // Clear OTP-related storage
        localStorage.removeItem("actionType");
        
        if (actionType === "forgot-password") {
          navigate("/change-password");
        } else {
          localStorage.removeItem("userEmail");
          navigate("/login");
        }
      } else {
        setError(response.message || "Invalid OTP");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await postData("/api/user/resend-otp", { 
        email: userEmail 
      });
      
      if (response.success) {
        alert("New OTP sent successfully!");
      } else {
        alert("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend failed:", error);
      alert("Error resending OTP");
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
            className="w-full py-3 mt-4 text-black font-bold rounded-md"
            style={{ background: "linear-gradient(45deg, #007BFF, #0056b3)" }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
  onClick={handleResendOtp}
  className="w-full py-3 mt-2 text-blue-600 font-bold"
  variant="outlined"
>
  Resend OTP
</Button>
        </form>
      </div>
    </section>
  );
}

export default Verify;
