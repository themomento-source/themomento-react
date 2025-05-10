import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api.js";
import { MyContext } from "../../App";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
 

  const forgotPassword = async () => {
    try {
      setForgotPasswordLoading(true);
      const response = await postData("/api/user/forgot-password", {
        email: formData.email,
        
      });
  
      context.setIsLogin(true);
  
      if (response.success) {
        
        
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("actionType", "forgot-password");
        
        navigate("/verify"); 
      } else {
        setErrors("Failed to send OTP:", response.message);
      }
    } catch (error) {
      setErrors({ general: "Password reset failed. Please try again." });
    }
    finally{
      setForgotPasswordLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await postData("/api/user/login", formData, {
          withCredentials: true,
        });

        if (response?.error === true) {
          if (response.message === "Invalid email") {
            setErrors({ email: "Invalid email address" });
          } else if (response.message === "Invalid password") {
            setErrors({ password: "Incorrect password" });
          } else {
            setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
          }
          context.openAlertBox("error", response.message || "Invalid credentials");
        } else if (
          response?.data?.accessToken &&
          response?.data?.refreshToken
        ) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          context.setIsLogin(true);
          navigate(`/my-account/${response.data.userId}`);
          
          window.location.reload();
        } else {
          console.error("Tokens missing in response:", response);
        }
      } catch (error) {
        console.error("Login failed:", error);
        context.openAlertBox("error", "Invalid credentials or server error");
        setErrors({ email: "Invalid credentials", password: "Invalid credentials", });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="section py-10 bg-gradient-to-b from-gray-900 to-black min-h-screen">
    <div className="container mx-auto px-4">
      <div className="card shadow-md w-full md:w-[500px] m-auto rounded-md bg-white p-5 px-12">
        <h3 className="text-center text-[20px] font-bold text-black">
          Login to Your Account
        </h3>
        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <div className="form-group w-full mb-5">
            <TextField
              type="text"
              name="email"
              id="email"
              label="Email *"
              variant="outlined"
              className="w-full"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>

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

          <div className="text-center my-3">
    <a
      className={`text-blue-600 text-[15px] font-semibold ${
        forgotPasswordLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:underline"
      }`}
      href="#"
      onClick={async (e) => {
        e.preventDefault();
        if (!forgotPasswordLoading) {
          await forgotPassword();
        }
      }}
    >
      {forgotPasswordLoading ? (
        <CircularProgress size={20} style={{ color: "blue" }} />
      ) : (
        "Forgot Password?"
      )}
    </a>
  </div>


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
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} /> // Loading spinner
              ) : (
                <span className="text-white">Login</span>
              )}
            </Button>
          </div>

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


          <div className="flex items-center justify-center">
           
          </div>
        </form>
      </div>
    </div>
  </section>
  );
}

export default Login;
