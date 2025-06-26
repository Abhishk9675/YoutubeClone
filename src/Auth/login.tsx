import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../Api/axios";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { getUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const body = {
      username: userName,
      password: password,
    };

    await api
      .post("/users/login", body)
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          console.log("Login successful:", document.cookie);
          localStorage.setItem("token", res.data.data.accessToken);
          localStorage.setItem("refressToken", res.data.data.refreshToken);
          await getUser();

          navigate("/home");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Please check your username and password.");
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
        <Typography
          variant="h6"
          mb={2}
          sx={{ position: "sticky", top: 0, left: 0 }}
        >
          DevUI
        </Typography>

        <Typography variant="h3" fontWeight="bold" mb={1}>
          Log in
        </Typography>
        <Typography sx={{ color: "gray" }} mb={4}>
          Before we start, please log into your account
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography
              variant="caption"
              color="var( --text-color)"
              fontWeight="bold"
              mb={0.5}
              display="block"
              fontSize="0.875rem"
            >
              Username
            </Typography>
            <TextField
              placeholder="Enter a username..."
              fullWidth
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              color="var( --text-color)"
              fontWeight="bold"
              mb={0.5}
              display="block"
              fontSize="0.875rem"
            >
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

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox sx={{ color: "var( --text-color)" }} />}
              label="Remember me"
            />
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "var( --text-color)" }}
              onClick={() => navigate("/change-password")}
            >
              Forgot password?
            </Typography>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={!userName || !password}
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
            Log in
          </Button>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
            <Box
              sx={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--border-color)",
              }}
            />
            <Typography variant="body2" sx={{ color: "var( --text-color)" }}>
              OR
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--border-color)",
              }}
            />
          </Stack>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#222",
              },
            }}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GitHubIcon />}
            sx={{
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#222",
              },
            }}
          >
            Login with GitHub
          </Button>
        </Stack>

        <Typography mt={3} variant="body2">
          Don’t have an account?{" "}
          <span
            style={{
              color: "var(--background-color)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", lg: "block" },
        }}
      >
        <img
          src={"src/assets/authImage.jpeg"}
          alt="Login Not Found"
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

export default Login;
