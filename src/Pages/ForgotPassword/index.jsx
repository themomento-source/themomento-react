import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ password: "", confirmPassword: "" });
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = { password: "", confirmPassword: "" };

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setError(errors);

    if (!errors.password && !errors.confirmPassword) {
      console.log("Password Changed Successfully");
      navigate("/dashboard"); // Redirect to dashboard after successful password change
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
            name="password"
            id="password"
            label="New Password"
            variant="outlined"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <TextField
            type="password"
            name="confirm_password"
            id="confirm_password"
            label="Confirm Password"
            variant="outlined"
            className="w-full mt-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
          />
          <Button
            type="submit"
            className="w-full py-3 mt-4 text-white font-bold rounded-md"
            style={{ background: "linear-gradient(45deg, #007BFF, #0056b3)" }}
          >
            Change Password
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
