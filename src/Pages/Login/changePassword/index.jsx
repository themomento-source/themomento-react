import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../utils/api";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    }
  });

  // Password strength validation
  const validatePassword = (pass) => {
    if (pass.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pass)) return "Password must have at least one uppercase letter";
    if (!/[a-z]/.test(pass)) return "Password must have at least one lowercase letter";
    if (!/\d/.test(pass)) return "Password must have at least one number";
    return "";
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await postData("/api/user/reset-password", {
        email: userEmail,
        newPassword: password,
      });

      if (response.success) {
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        setPasswordError(response.message || "Password reset failed");
      }
    } catch (error) {
      setPasswordError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <h3 className="text-center text-xl font-bold text-gray-800 mb-4">
          Set New Password
        </h3>
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            required
          />
          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            required
          />
          {/* Password Requirements */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Password requirements:
            <ul className="list-disc pl-5">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </Typography>
          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !!passwordError || !!confirmPasswordError}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
