import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { postData } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase.jsx";
import { MyContext } from "../../App";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Register() {
  const context = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    location: false,
    email: false,
    password: false,
    passwordStrength: "",
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



    // Validate password while typing
    if (e.target.name === "password") {
      const passwordValidation = validatePassword(e.target.value);
      setErrors({
        ...errors,
        passwordStrength: passwordValidation,
        password: e.target.value.trim() === "" ? true : false,
      });
    }
  };

  // Password validation
  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const symbol = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength = 6;

    if (!uppercase.test(password) || !lowercase.test(password) || !symbol.test(password) || password.length < minLength) {
      return "Password must be at least 6 characters long, include uppercase, lowercase, and a symbol.";
    }
    return "";
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

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      newErrors.password = true;
      setErrors({ ...newErrors, passwordStrength: passwordValidation });
    } else {
      setErrors({ ...newErrors, passwordStrength: "" });
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      setLoading(true);
      const response = await postData("/api/user/register", formData);

      if (response.success) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("actionType", "registration");
        setSuccessMessage(
          "Registration successful! An OTP has been sent to your email."
        );
        setTimeout(() => {
          navigate("/verify");
        }, 1000);
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
    <section className="min-h-screen bg-gray-50 to-black">
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Promo Content */}
                <div className="text-white space-y-8 ">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold bg-gray-900 bg-clip-text text-transparent font-marcellus">
                            Your Gateway to a Global Photography Career Starts Here
                        </h1>
                        <p className="text-xl text-gray-900 font-pt-serif">
                            Turn your everyday passion into a powerful portfolio.
At The Momento, we’re not just showcasing beautiful images we’re helping photographers build
 meaningful careers and creative futures.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold font-pt-serif text-gray-900">Why Sign Up?</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    {/* <span className="text-blue-400 text-xl">📸</span> */}
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Build Your Free Professional Portfolio</h3>
                                    <p className="text-gray-900 text-sm">Each photo you submit contributes to a sleek, 
                                      review-based portfolio perfect to share with clients, 
                                      employers, or use in applications and grants.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    {/* <span className="text-purple-400 text-xl">🌟</span> */}
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Daily Submissions & Expert Reviews</h3>
                                    <p className="text-gray-900 text-sm">Upload up to 3 photos per day and receive curated reviews that 
                                      help refine your storytelling and elevate your craft.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Global Exposure</h3>
                                    <p className="text-gray-900 text-sm">Featured photos published on our platform and social media.</p>
                                </div>
                            </div>
                               <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Grow with Global Community</h3>
                                    <p className="text-gray-900 text-sm">Stand out in an international photography community.
                                       Featured photos get published on our 
                                      website and social media giving your work the reach it deserves.</p>
                                </div>
                            </div>
                               <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Learn by Doing</h3>
                                    <p className="text-gray-900 text-sm">Gain hands-on experience, sharpen your visual language, 
                                      and explore real-world photography topics through our free articles, tips, and interviews.</p>
                                </div>
                            </div>
                              <div className="flex items-start gap-4">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    
                                </div>
                                <div>
                                    <h3 className="font-medium font-pt-serif text-gray-900">Join a Supportive Creative Network</h3>
                                    <p className="text-gray-900 text-sm">Collaborate with photographers worldwide, join challenges, and be
                                       part of a platform that exists to empower your journey.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-200 p-6 shadow-md">
                        <p className="text-xl text-black font-medium text-center font-marcellus">
                            Signing up takes less than 1 minute.<br/>
                            <span className="text-gray-800">Start building your future in photography for free.</span>
                        </p>
                    </div>
                </div>

                {/* Right Column - Registration Form */}
                <div className="bg-white  shadow-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8 font-marcellus">
                        Start Your Journey
                    </h3>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            type="text"
                            label="Full Name *"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            helperText={errors.name && "Full Name is required"}
                        />

                        <TextField
                            name="location"
                            type="text"
                            label="Location *"
                            variant="outlined"
                            fullWidth
                            value={formData.location}
                            onChange={handleChange}
                            helperText={errors.location && "Location is required"}
                        />

                        <TextField
                            name="mobile"
                            type="tel"
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            value={formData.mobile}
                            onChange={handleChange}
                        />

                        <TextField
                            name="email"
                            type="email"
                            label="Email ID *"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email && "Email is required"}
                        />

                        <div className="relative">
                            <TextField
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password *"
                                variant="outlined"
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                helperText={errors.password && "Password is required"}
                            />
                            <button
                                type="button"
                                className="absolute top-3 right-3"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <IoMdEyeOff className="text-gray-500" /> : <IoMdEye className="text-gray-500" />}
                            </button>
                        </div>

                        {errors.passwordStrength && (
                            <div className="text-red-500 text-sm">{errors.passwordStrength}</div>
                        )}

                        {errorMessage && (
                            <div className="text-red-500 text-center">{errorMessage}</div>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 font-bold shadow-lg"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                        </Button>

                        {successMessage && (
                            <div className="text-green-500 text-center">{successMessage}</div>
                        )}

                        

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                           
                        </div>

                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>

        
        </div>
    </section>
);}

export default Register;
