import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc"; // Google Icon

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    phone: "",
    email: "",
    password: "",
    accountType: "buyer", // Default to "buyer"
  });

  const [errors, setErrors] = useState({
    username: false,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "username" && e.target.value.trim() !== "") {
      setErrors({ ...errors, username: false });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username.trim() === "") {
      setErrors({ ...errors, username: true });
      return;
    }

    console.log("Form Data:", formData);
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-12">
          <h3 className="text-center text-[20px] font-bold text-black">
            Create Your Account
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            {/* User Name Field (Required) */}
            <div className="form-group w-full mb-5">
              <TextField
                name="username"
                type="text"
                label="User Name *"
                variant="outlined"
                className="w-full"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                helperText={errors.username ? "User Name is required" : ""}
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

            {/* Phone Number Field */}
            <div className="form-group w-full mb-5">
              <TextField
                name="phone"
                type="tel"
                label="Phone Number"
                variant="outlined"
                className="w-full"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="form-group w-full mb-5">
              <TextField
                name="email"
                type="email"
                label="Email ID"
                variant="outlined"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[45px] !min-w-[35px] !text-black !rounded-full"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <IoMdEyeOff className="!text-[20px] !opacity-75" />
                ) : (
                  <IoMdEye className="!text-[20px] !opacity-75" />
                )}
              </Button>
            </div>

            {/* Account Type Field */}
            <div className="form-group w-full mb-5">
              <FormLabel component="legend">Account Type *</FormLabel>
              <RadioGroup
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
            </div>

            {/* Register Button */}
            <div className="flex items-center mt-5">
              <Button
                type="submit"
                className="w-full py-3 text-white !text-white !font-bold rounded-md"
                style={{
                  background: "linear-gradient(45deg, #007BFF, #0056b3)",
                  color: "white",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "linear-gradient(45deg, #0056b3, #003f7f)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "linear-gradient(45deg, #007BFF, #0056b3)")
                }
              >
                Register
              </Button>
            </div>

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
              <Button
                className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md text-black font-medium"
                style={{
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f5f5f5")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
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
