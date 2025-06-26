import { Box, Typography, Avatar } from "@mui/material";
import api from "../Api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/videos/video-feeds?page=1&limit=1");
      setVideos(res.data.data.videos);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const toVideoPlayer = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };
  return (
    <Box sx={{ backgroundColor: "#0f0f0f", padding: "1rem" }}>
      {loading ? (
        <Typography color="#fff">Loading videos...</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {videos.map((video, index) => (
            <Box
              key={video._id || index}
              sx={{
                flex: "1 1 calc(33.33% - 1rem)",
                maxWidth: "calc(33.33% - 1rem)",
                backgroundColor: "#181818",
                color: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                "@media (max-width: 900px)": {
                  flex: "1 1 calc(50% - 1rem)",
                  maxWidth: "calc(50% - 1rem)",
                },
                "@media (max-width: 600px)": {
                  flex: "1 1 100%",
                  maxWidth: "100%",
                },
              }}
              onClick={() => toVideoPlayer(video._id)}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: "2px 6px",
                    fontSize: "12px",
                    borderRadius: "4px",
                  }}
                >
                   {video.duration.toFixed(2)}s
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, padding: "1rem" }}>
                <Avatar src={video.owner.avatar} alt={video.channel} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#fff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={video.title}
                  >
                    {video.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    {video.views} Views •{" "}
                    {formatDistanceToNow(new Date(video.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    {video.owner.fullname}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
