import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  TextField,
  Tab,
  Tabs,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { ThumbUp, ThumbDown, Edit as EditIcon } from "@mui/icons-material";
import CustomButton from "../Components/button";
import api from "../Api/axios";
import { useUser } from "../context/UserContext";

const videos = [
  {
    id: 1,
    content: "Exploring the latest features in JavaScript ES11! 💡 #JavaScript #ES11",
    likes: 425,
    dislikes: 87,
    time: "5 hours ago",
  },
  {
    id: 2,
    content: "Embracing the benefits of TypeScript for stronger, more reliable code. 🚀 #TypeScript #Programming",
    likes: 425,
    dislikes: 87,
    time: "6 hours ago",
  },
];

const MyContent = () => {
    const { user } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const [videoInput, setVideoInput] = useState("");
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const [openNameEdit, setOpenNameEdit] = useState(false);
  const [openCoverEdit, setOpenCoverEdit] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    channelName: "",
    email: "",
    password: "",
  });


  useEffect(() => {
    if (openNameEdit && user) {
      setUserData({
        fullName: user.fullname || "",
        channelName: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [openNameEdit, user]);

  const updateAvatar = () => {
    const fileInput = document.getElementById("avatar-upload") as HTMLInputElement;
    if (!fileInput || !fileInput.files?.length) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", fileInput.files[0]);

    api.post("/users/update-avatar", formData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("Avatar updated successfully.");
          setOpenAvatarEdit(false);
          fileInput.value = "";
        }
      })
      .catch((err) => console.error("Error updating avatar:", err));
  };

  const updateCover = () => {
    const fileInput = document.getElementById("cover-upload") as HTMLInputElement;
    if (!fileInput || !fileInput.files?.length) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("cover", fileInput.files[0]);

    api.post("/users/update-cover", formData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("Cover updated successfully.");
          setOpenCoverEdit(false);
          fileInput.value = "";
        }
      })
      .catch((err) => console.error("Error updating cover:", err));
  };

  const updateUserInfo = () => {
    api.post("/users/update-user", userData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert("User info updated successfully.");
          setOpenNameEdit(false);
        }
      })
      .catch((err) => console.error("Error updating user info:", err));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ flex: 1, overflowY: "auto", bgcolor: "var(--bodyBackground-color)", color: "var(--text-color)", p: 3 }}>
      <Box sx={{ height: 160, background: `url('${user?.cover}') center/cover`, borderRadius: 2, position: "relative" }}>
        <IconButton onClick={() => setOpenCoverEdit(true)} sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: -2, mb: 2 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar src={user?.avatar} sx={{ width: 80, height: 80, border: "3px solid white" }} />
          <IconButton onClick={() => setOpenAvatarEdit(true)} size="small" sx={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#000", color: "#fff", p: 0.5 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography  variant="h6">{user?.fullname}</Typography>
            <IconButton size="small" onClick={() => setOpenNameEdit(true)} sx={{ color: "#fff", p: 0.5 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="gray">
            @{user?.username} &bull; Email: {user?.email}
          </Typography>
        </Box>
      </Stack>

      <Tabs value={activeTab} onChange={(_e, val) => setActiveTab(val)} sx={{ borderBottom: "1px solid var(--border-color)", mb: 2 }}>
        <Tab label="Videos" sx={{ color: "#fff" }} />
        <Tab label="Subscribed" sx={{ color: "#fff" }} />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar src={user?.avatar} />
            <TextField
              variant="outlined"
              placeholder="Write a tweet"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              fullWidth
              sx={{ background: "#1a1a1a", borderRadius: 2, input: { color: "#fff" } }}
            />
            <CustomButton onClick={() => setVideoInput("")}>Send</CustomButton>
          </Stack>

          {videos.map((video) => (
            <Box key={video.id} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                {user?.fullname} <span style={{ color: "gray" }}>{video.time}</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{video.content}</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: "var(--background-color)" }}>
                  <ThumbUp fontSize="small" /> {video.likes}
                </IconButton>
                <IconButton size="small" sx={{ color: "var(--error-color)" }}>
                  <ThumbDown fontSize="small" /> {video.dislikes}
                </IconButton>
              </Stack>
              <Divider sx={{ mt: 2, borderColor: "var(--border-color)" }} />
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={openAvatarEdit} onClose={() => setOpenAvatarEdit(false)}>
        <DialogTitle>Edit Avatar</DialogTitle>
        <DialogContent>
          <input id="avatar-upload" type="file" accept="image/*" style={{ marginTop: "8px" }} />
          <Button onClick={updateAvatar} sx={{ mt: 2 }}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openNameEdit} onClose={() => setOpenNameEdit(false)}>
        <DialogTitle>Edit Channel Info</DialogTitle>
        <DialogContent>
          <TextField fullWidth placeholder="Full Name" name="fullName" value={userData.fullName} onChange={handleInputChange} sx={{ mt: 1 }} />
          <TextField fullWidth placeholder="Channel Name" name="channelName" value={userData.channelName} onChange={handleInputChange} sx={{ mt: 1 }} />
          <TextField fullWidth placeholder="Email" name="email" value={userData.email} onChange={handleInputChange} sx={{ mt: 1 }} />
          <TextField fullWidth placeholder="Password" type="password" name="password" value={userData.password} onChange={handleInputChange} sx={{ mt: 1 }} />
          <Button onClick={updateUserInfo} sx={{ mt: 2 }}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openCoverEdit} onClose={() => setOpenCoverEdit(false)}>
        <DialogTitle>Edit Background Photo</DialogTitle>
        <DialogContent>
          <input id="cover-upload" type="file" accept="image/*" />
          <Button onClick={updateCover} sx={{ mt: 2 }}>Save</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyContent;
