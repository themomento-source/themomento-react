import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api.js";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!newPassword) errors.newPassword = "New password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    if (newPassword !== confirmPassword) errors.match = "Passwords do not match";

    if (Object.keys(errors).length > 0) return setErrors(errors);

    setLoading(true);

    try {
      const userEmail = localStorage.getItem("userEmail");
      
      const response = await postData("/api/user/reset-password", {
        email: userEmail,
        newPassword: newPassword
      });

      if (response.success) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        navigate("/login");
      } else {
        setErrors({ general: response.message || "Password reset failed" });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <h3 className="text-center text-xl font-bold text-gray-800 mb-4">
          Reset Your Password
        </h3>
        
        <form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="New Password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />

          <TextField
            type="password"
            label="Confirm Password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword || !!errors.match}
            helperText={errors.confirmPassword || errors.match}
          />

          {errors.general && (
            <div className="text-red-500 text-sm mb-4">{errors.general}</div>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;