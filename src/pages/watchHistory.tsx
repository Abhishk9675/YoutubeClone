import  { useEffect, useState } from "react";
import api from "../Api/axios";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoFile: string;
  duration: number;
  views: number;
  createdAt: string;
}

const WatchHistory = () => {
  const [history, setHistory] = useState<Video[]>([]);
  const navigate = useNavigate();

  const getWatchHistory = async () => {
    try {
      const res = await api.get("/users/watch-history");
      if (res.data.statusCode === 200 && res.data.data) {
        setHistory(res.data.data);
      } else {
        console.error("Failed to fetch watch history:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching watch history:", err);
    }
  };

  useEffect(() => {
    getWatchHistory();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Watch history
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "gray", mb: 2 }}>
        Today
      </Typography>

      <Stack spacing={3}>
        {history.map((video) => (
          <Box
            key={video._id}
            sx={{
              display: "flex",
              alignContent:"center",
              alignItems: "center",
              gap: 2,
              backgroundColor: "var(--popupBackground-color)",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
            onClick={() => navigate(`/video/${video._id}`)}
          >
            <Box
              component="img"
              src={video.thumbnail}
              alt={video.title}
              sx={{
                width: 250,
                height: 140,
                objectFit: "cover",
                borderRight: "2px solid var(--border-color)",
              }}
            />

            <Box sx={{ flex: 1, pr: 5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {video.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                {video.views} views • {Math.floor(video.duration)} min
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "gray", mt: 1 }}
                noWrap
              >
                {video.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default WatchHistory;
