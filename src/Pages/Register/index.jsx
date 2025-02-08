import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { postData } from "../../utils/api.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import CircularProgress from "@mui/material/CircularProgress"; // For loading spinner
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase.jsx";
import { MyContext } from "../../App";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

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

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      setLoading(true);
      const response = await postData("/api/user/register", formData);

      if (response.success) {
        localStorage.setItem("userEmail", formData.email);
        setSuccessMessage(
          "Registration successful! An OTP has been sent to your email."
        );
        setTimeout(() => {
          navigate("/verify");
        }, 2000);
      } else {
        setErrorMessage(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Authentication
  const authWithGoogle = async () => {
    
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const fields = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        password: null,
        mobile: user.phoneNumber,
        role: "USER",
      };

      const response = await postData("/api/user/authWithGoogle", fields);

      if (response.success) {
        localStorage.setItem("userEmail", fields.email);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        context.setIsLogin(true);

        setSuccessMessage("Google sign-in successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(response.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      setErrorMessage(error.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
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
                className="absolute top-[10px] right-[10px]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {errorMessage && (
              <div className="text-center text-red-500">{errorMessage}</div>
            )}

            <Button
              type="submit"
              className="w-full py-3 text-white font-bold"
              style={{ background: "linear-gradient(45deg, #007BFF, #0056b3)" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="white" />
              ) : (
                "Register"
              )}
            </Button>

            {successMessage && (
              <div className="text-center text-green-500">{successMessage}</div>
            )}

            <div className="text-center mt-4">
              <span className="text-gray-600">
                Already have an account?{" "}
                <a className="text-blue-600 font-semibold" href="#">
                  Login
                </a>
              </span>
            </div>

            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              className="w-full flex items-center py-3 border"
              onClick={authWithGoogle}
            >
              <FcGoogle className="text-[20px] mr-2" /> Continue with Gmail
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
