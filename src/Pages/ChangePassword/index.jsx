import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { postData } from "../../utils/api.js";

function ChangePassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setError("Invalid request. Please try forgot password again.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await postData("/api/user/reset-password", {
        email: userEmail,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        // Clear stored data
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        
        // Redirect to login with success message
        navigate("/login", { 
          state: { message: "Password changed successfully! Please login with your new password." }
        });
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (error) {
      setError("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <h3 className="text-center text-xl font-bold text-gray-800">
          Change Your Password
        </h3>
        <p className="text-center text-gray-500 text-sm mt-1">
          Enter your new password below.
        </p>
        <form className="mt-5" onSubmit={handleSubmit}>
          <TextField
            type="password"
            name="newPassword"
            id="newPassword"
            label="New Password"
            variant="outlined"
            className="w-full mb-4"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!error}
            required
          />
          
          <TextField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm New Password"
            variant="outlined"
            className="w-full mb-4"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!error}
            required
          />
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          
          <Button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-md"
            style={{ background: "linear-gradient(45deg, #007BFF, #0056b3)" }}
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword; 