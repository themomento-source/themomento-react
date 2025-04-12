import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Paper,
  MenuItem
} from "@mui/material";
import { MyContext } from "../../App";
import { editData } from "../../utils/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Settings = () => {
  const { userData, setUserData, openAlertBox } = useContext(MyContext);
  const [formData, setFormData] = useState({
    mobile: "",
    about: "",
    location: "",
    websites: "",
    instagram: "",
    twitter: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Initialize form with user data
  useEffect(() => {
    if (userData) {
      setFormData({
        mobile: userData.mobile || "",
        about: userData.about || "",
        location: userData.location || "",
        websites: userData.socialLinks?.websites || "",
        instagram: userData.socialLinks?.instagram || "",
        twitter: userData.socialLinks?.twitter || "",
        award: userData.award || "",
        genres: userData.genres || "",
        favouriteEquipement: userData.favouriteEquipement || "",
        gender: userData.gender || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, about: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await editData(
        `/api/user/update-user/${userData._id}`,
        formData
      );
  
      if (response.user) {
        setUserData((prev) => ({
          ...prev,
          ...response.user,
          socialLinks: {
            ...prev.socialLinks,
            ...response.user.socialLinks,
          },
        }));
  
        setTimeout(() => {
          navigate(`/user/${response.user._id}`);
        }, 1000);
  
        openAlertBox("success", "Profile updated successfully!");
      }
    } catch (error) {
      openAlertBox("error", error.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ 
      ...passwordForm, 
      [e.target.name]: e.target.value 
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      openAlertBox("error", "Passwords do not match");
      return;
    }
  
    try {
      const response = await editData("/api/user/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
  
      if (response.success) {
        openAlertBox("success", "Password changed successfully");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      openAlertBox("error", error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            type="number"
            value={formData.mobile}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

<TextField
  select
  fullWidth
  label="Gender"
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  margin="normal"
  variant="outlined"
>
  <MenuItem value="">Select Gender</MenuItem>
  <MenuItem value="male">MALE</MenuItem>
  <MenuItem value="female">FEMALE</MenuItem>
  <MenuItem value="others">OTHERS</MenuItem>
</TextField>

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            About You
          </Typography>
          <ReactQuill
            theme="snow"
            value={formData.about}
            onChange={handleQuillChange}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image', 'video'],
                ['clean']
              ],
            }}
          />

          <TextField
            fullWidth
            label="Photography Genres"
            name="genres"
            multiline
            rows={1}
            value={formData.genres}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Awards"
            name="award"
            multiline
            rows={3}
            value={formData.award}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Favorite Equipment List"
            name="favouriteEquipement"
            multiline
            rows={3}
            value={formData.favouriteEquipement}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />



          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Social Links
          </Typography>

          <TextField
            fullWidth
            label="Website"
            name="websites"
            value={formData.websites}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="https://example.com"
          />

          <TextField
            fullWidth
            label="Instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="@username"
          />

          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="@username"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
            fullWidth
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handlePasswordSubmit}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            margin="normal"
            error={passwordForm.newPassword !== passwordForm.confirmPassword}
            helperText={
              passwordForm.newPassword !== passwordForm.confirmPassword 
              ? "Passwords do not match" 
              : ""
            }
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={
              !passwordForm.currentPassword ||
              !passwordForm.newPassword ||
              !passwordForm.confirmPassword
            }
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Settings;