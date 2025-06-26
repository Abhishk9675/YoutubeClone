import {
  Box,
  Stack,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Button from "./button";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";
import UploadDialog from "./uploadVideo";
import { useUser } from "../context/UserContext";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
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
}));

const menuItems = [
  { label: "Liked Videos", icon: <ThumbUpIcon /> },
  { label: "My Content", icon: <VideoLibraryIcon /> },
  { label: "Support", icon: <SupportIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const {  user,getUser } =useUser();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleUploadVideo = () => {
    setUploadOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadOpen(false);
  };

  const handleToLogin = () => {
    if (user?._id) {
      alert("You are already logged in!");
    } else {
      navigate("/login");
    }
  };

  const handleSignup = () => {
    if (!user?._id) {
      navigate("/signup");
    }
  };

  const handleLogout = () => {
    api
      .get("/users/logout")
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("Logout successful!");
          navigate("/");
          getUser();
          
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("Logout failed. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "var(--bodyBackground-color)",
        borderBottom: "2px solid var(--border-color)",
      }}
    >
      <img
        src="src/assets/headerPlay.png"
        alt="Logo"
        style={{ width: "4rem", height: "auto" }}
      />

      <Box sx={{ flex: 1, maxWidth: "600px", margin: "0 2rem" }}>
        <StyledTextField
          placeholder="Search"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon
                style={{ color: "var(--text-color)", marginRight: "8px" }}
              />
            ),
          }}
        />
      </Box>

      {isSmallScreen ? (
        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 0,
              border: "none",
              "&:hover": {
                backgroundColor: "#4f4e4e",
              },
            }}
            onClick={user?._id ? handleUploadVideo : handleToLogin}
          >
            {user?._id ? "Upload video" : "Log in"}
          </Button>
          <Button
            variant="contained"
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
            }}
            onClick={user?._id ? handleLogout : handleSignup}
          >
            {user?._id ? "Logout" : "Sign up"}
          </Button>
        </Stack>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 240,
            backgroundColor: "var(--bodyBackground-color)",
            color: "var(--text-color)",
          },
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            alignSelf: "flex-end",
            m: 1,
            color: "white",
            "&:hover": {
              color: "var(--textHover-color)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  border: "1px solid var(--text-color)",
                  margin: "0.2rem",
                  borderRadius: 0,
                  color: "var(--text-color)",
                  "&:hover": {
                    backgroundColor: "var(--backgroundHover-color)",
                    color: "var(--textHover-color)",
                    "& .MuiListItemIcon-root": {
                      color: "var(--textHover-color)",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <UploadDialog open={uploadOpen} onClose={handleCloseUploadDialog} />
    </Box>
  );
};

export default Header;
