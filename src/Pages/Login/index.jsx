import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { useNavigate } from "react-router-dom";
import {MyContext} from "../../App"

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use navigate here
  const context = useContext(MyContext);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Forgot Password function (Moved outside handleSubmit)
  const forgotPassword = () => {
    
      context.openAlertBox("Success", "OTP Send in your email");
      navigate("/verify");
      
    
  };

  // Validate form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.identifier.trim()) {
      validationErrors.identifier = "Username or Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      // Add your login logic here
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-12">
          <h3 className="text-center text-[20px] font-bold text-black">
            Login to Your Account
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            {/* Username or Email Field */}
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                name="identifier"
                id="identifier"
                label="Username or Email *"
                variant="outlined"
                className="w-full"
                value={formData.identifier}
                onChange={handleChange}
                error={!!errors.identifier}
                helperText={errors.identifier}
              />
            </div>

            {/* Password Field */}
            <div className="form-group w-full mb-5">
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-center my-3">
              <a
                className="text-blue-600 text-[15px] font-semibold cursor-pointer hover:underline"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  forgotPassword();
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="flex items-center mt-5">
              <Button
                type="submit"
                className="w-full py-3 text-white font-bold rounded-md"
                style={{
                  background: "linear-gradient(45deg, #007BFF, #0056b3)",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    "linear-gradient(45deg, #0056b3, #003f7f)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    "linear-gradient(45deg, #007BFF, #0056b3)")
                }
              >
                Login
              </Button>
            </div>

            {/* Not registered? Sign up */}
            <div className="text-center mt-4">
              <span className="text-gray-600 text-[15px]">
                Not registered?{" "}
                <a
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  href="register"
                >
                  Sign up
                </a>
              </span>
            </div>

            {/* OR continue with Google */}
            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-[14px]">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex items-center justify-center">
              <Button
                className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md text-black font-medium"
                style={{ transition: "0.3s ease" }}
                onMouseOver={(e) => (e.target.style.background = "#f5f5f5")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                <FcGoogle className="text-[20px] mr-2" />
                Continue with Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
