import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";

const Forgot = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = async() => {

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }


    const body = {
      oldPassword,
      newPassword,
    };

   await api
      .post("/users/change-password", body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("Password changed successfully.");
          navigate("/login");
        } else {
          alert(res.data.message || "Failed to change password.");
        }
      })
      .catch((err) => {
        console.error("Error changing password:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        minHeight: "100vh",
        backgroundColor: "var(--bodyBackground-color)",
        color: "var(--text-color)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, md: 10 },
          py: 6,
        }}
      >
        <Typography variant="h6" mb={2}>
          DevUI
        </Typography>

        <Typography variant="h3" fontWeight="bold" mb={1}>
          Change password?
        </Typography>
        <Typography sx={{ color: "gray" }} mb={4}>
          Don’t worry! Just enter your credentials and reset your password
          securely.
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              mb={1}
              display="block"
              fontSize="0.875rem"
            >
              Old Password
            </Typography>
            <TextField
              placeholder="Enter old password..."
              fullWidth
              type="password"
              variant="outlined"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                sx: {
                  color: "var(--text-color)",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              mb={1}
              display="block"
              fontSize="0.875rem"
            >
              New Password
            </Typography>
            <TextField
              placeholder="Enter new password..."
              fullWidth
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                sx: {
                  color: "var(--text-color)",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              mb={1}
              display="block"
              fontSize="0.875rem"
            >
              Confirm New Password
            </Typography>
            <TextField
              placeholder="Confirm new password..."
              fullWidth
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                sx: {
                  color: "var(--text-color)",
                  borderRadius: 0,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--text-color)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handlePasswordChange}
            disabled={
              !oldPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            sx={{
              backgroundColor: "var(--background-color)",
              color: "var(--textHover-color)",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 0,
              boxShadow: "5px 5px 0px 0px #4f4e4e",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--background-color)",
                boxShadow: "5px 5px 0px 0px #4f4e4e",
              },
              "&:active": {
                boxShadow: "0px 0px 0px 0px #4f4e4e",
                transform: "translate(5px, 5px)",
              },
              "&.Mui-disabled": {
                backgroundColor: "gray",
                color: "#ccc",
                boxShadow: "none",
              },
            }}
          >
            Change Password
          </Button>

          <Typography mt={2} variant="body2">
            Already registered?{" "}
            <span
              style={{
                color: "var(--background-color)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Sign in to your account
            </span>
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", lg: "block" },
        }}
      >
        <img
          src={"src/assets/authImage.jpeg"}
          alt="Register Image"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default Forgot;
