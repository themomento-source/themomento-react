import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { postData } from "../../utils/api.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import CircularProgress from "@mui/material/CircularProgress"; // For loading spinner

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false); // Loading state to show spinner
  const [successMessage, setSuccessMessage] = useState(""); // To store success message
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.value.trim() !== "") {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      setLoading(true); // Set loading to true while submitting
      const response = await postData("/api/user/register", formData);

      if (response.success) {
        localStorage.setItem("userEmail", formData.email);
        setSuccessMessage(
          "Registration successful! An OTP has been sent to your email to verify."
        );
        setTimeout(() => {
          navigate("/verify"); // Redirect to verify page
        }, 2000); // Redirect after 5 seconds to let user read the message
      } else {
        setSuccessMessage(""); // Clear success message on error
        setErrorMessage(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-12">
          <h3 className="text-center text-[20px] font-bold text-black">
            Create Your Account
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            {/* Name Field (Required) */}
            <div className="form-group w-full mb-5">
              <TextField
                name="name"
                type="text"
                label="Username *"
                variant="outlined"
                className="w-full"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
              />
            </div>

            {/* Full Name Field */}
            <div className="form-group w-full mb-5">
              <TextField
                name="fullname"
                type="text"
                label="Full Name"
                variant="outlined"
                className="w-full"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number Field */}
            <div className="form-group w-full mb-5">
              <TextField
                name="mobile"
                type="tel"
                label="Mobile Number"
                variant="outlined"
                className="w-full"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="form-group w-full mb-5">
              <TextField
                name="email"
                type="email"
                label="Email ID *"
                variant="outlined"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? "Email is required" : ""}
              />
            </div>

            {/* Password Field */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password *"
                variant="outlined"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                helperText={errors.password ? "Password is required" : ""}
              />
              <button
                type="button"
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[45px] !min-w-[35px] !text-black !rounded-full"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <IoMdEyeOff className="!text-[20px] !opacity-75" />
                ) : (
                  <IoMdEye className="!text-[20px] !opacity-75" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <div className="mt-3 text-center text-red-500">
                {errorMessage}
              </div> // Display error message here
            )}

            {/* Register Button */}
            <div className="flex items-center mt-5">
              <Button
                type="submit"
                className="w-full py-3 text-white font-bold rounded-md"
                style={{
                  background: "linear-gradient(45deg, #007BFF, #0056b3)",
                  color: "white",
                  transition: "0.3s ease",
                }}
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <CircularProgress size={24} color="white" /> // Show loader while loading
                ) : (
                  "Register"
                )}
              </Button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-3 text-center text-green-500">
                {successMessage}
              </div>
            )}

            {/* Already have an account? Login */}
            <div className="text-center mt-4">
              <span className="text-gray-600 text-[15px]">
                Already have an account?{" "}
                <a
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  href="#"
                >
                  Login
                </a>
              </span>
            </div>

            {/* OR continue with Gmail */}
            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-[14px]">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex items-center justify-center">
              <Button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md text-black font-medium">
                <FcGoogle className="text-[20px] mr-2" />
                Continue with Gmail
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
