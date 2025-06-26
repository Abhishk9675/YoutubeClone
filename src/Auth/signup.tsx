import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSignup = () => {
    const formData = new FormData();

    formData.append("fullname", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    api
      .post("users/register", formData, {
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("avatar", res.data.data.avatar);
          alert("Account created successfully!Please login to continue.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Signup error:", err);
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
        }}
      >
        <Typography variant="h6" mb={2}>
          DevUI
        </Typography>

        <Typography variant="h3" fontWeight="bold" mb={1}>
          Register
        </Typography>
        <Typography sx={{ color: "gray" }} mb={4}>
          Before we start, please create your account
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" fontWeight="bold" fontSize="0.875rem">
              Full name
            </Typography>
            <TextField
              placeholder="Enter a full name..."
              fullWidth
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            <Typography variant="caption" fontWeight="bold" fontSize="0.875rem">
              Email
            </Typography>
            <TextField
              placeholder="Enter an email..."
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Typography variant="caption" fontWeight="bold" fontSize="0.875rem">
              Username
            </Typography>
            <TextField
              placeholder="Enter a username..."
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Typography variant="caption" fontWeight="bold" fontSize="0.875rem">
              Password
            </Typography>
            <TextField
              placeholder="Enter a password..."
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              fontSize="0.875rem"
              mb={1}
              display="block"
            >
              Upload Avatar
            </Typography>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const fileInput = e.target as HTMLInputElement;
                if (fileInput.files && fileInput.files.length > 0) {
                  setAvatar(fileInput.files[0]);
                }
              }}
              style={{
                backgroundColor: "transparent",
                color: "var(--text-color)",
                border: "1px solid var(--text-color)",
                padding: "10px",
                borderRadius: "4px",
                width: "97.5%",
              }}
            />
          </Box>

          <FormControlLabel
            control={<Checkbox sx={{ color: "var(--text-color)" }} />}
            label="You will get emails on new features and releases"
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "var(--text-color)" }} />}
            label="I agree to the terms and conditions"
          />

          <Button
            variant="contained"
            fullWidth
            disabled={!fullName || !email || !password || !username}
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
            onClick={handleSignup}
          >
            Create Account
          </Button>

          <Typography mt={3} variant="body2">
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
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
        }}
      >
        <img
          src={"src/assets/authImage.jpeg"}
          alt="Register Image"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            display: "block", // prevents layout glitches
          }}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
