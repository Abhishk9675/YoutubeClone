import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";
import { useEffect, useState } from "react";

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

interface LikedVideoItem {
  _id: string;
  video: Video;
}


const LikedVideo = () => {
  const navigate = useNavigate();
  const [likedVideo, setLikedVideo] = useState<LikedVideoItem[]>([]);

  useEffect(() => {
    getLikedVideos();
  }, []);

  const getLikedVideos = async () => {
    api
      .get("/like/my-liked-video")
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLikedVideo(res.data.data);
        } else {
          console.error("Failed to fetch liked videos:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching liked videos:", err);
      });
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Liked Videos
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "gray", mb: 2 }}>
        Today
      </Typography>

      <Stack spacing={3}>
        {likedVideo.map((item) => {
          const video = item.video;
          return (
            <Box
              key={video._id}
              sx={{
                display: "flex",
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
          );
        })}
      </Stack>
    </Box>
  );
};

export default LikedVideo;
