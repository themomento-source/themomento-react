import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api.js";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      navigate("/forgot-password");
    }
  }, [userEmail, navigate]);
  
  // Add password strength validation
  const validatePassword = (pass) => {
    return pass.length >= 8 && 
      /[A-Z]/.test(pass) && 
      /[a-z]/.test(pass) && 
      /\d/.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
        setError("Password must be 8+ chars with uppercase, lowercase & number");
        return;
    }

    setLoading(true);
    
    try {
      const response = await postData("/api/user/reset-password", {
        email: userEmail,
        newPassword: password
      });

      if (response.success) {
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        setError(response.message || "Password reset failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error}
            required
          />

<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
  Password requirements:
  <ul className="list-disc pl-5">
    <li>At least 8 characters</li>
    <li>One uppercase letter</li>
    <li>One lowercase letter</li>
    <li>One number</li>
  </ul>
</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !validatePassword(password)}
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