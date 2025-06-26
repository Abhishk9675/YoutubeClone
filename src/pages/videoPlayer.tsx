import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import api from "../Api/axios";
import { formatDistanceToNow } from "date-fns";
import Button from "../Components/button";
import { useParams } from "react-router-dom";

interface VideoType {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  views?: number;
  createdAt?: string;
  totalVideoLikes?: number;
  totalVideoDislikes?: number;
}
interface CommentType {
  _id: string;
  name: string;
  avatar: string;
  content: string;
  time: string;
}
const VideoGallery = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId") || "";
  const mainVideo = videos[0];

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    try {
      const res = await api.get(`/videos/video/${id}`);
      if (res.data?.data?.length > 0) {
        setVideos(res.data.data);
        setComments(res.data.data[0].comments || []);
      } else {
        alert("No videos found for this ID.");
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const postComment = async () => {
    if (commentInput.trim()) {
      const body = {
        videoId: id,
        comment: commentInput,
      };

      try {
        const res = await api.post("/comment/post-comment", body);
        if (res.status === 201) {
          const newComment: CommentType = {
            _id: crypto.randomUUID(),
            name: "You",
            avatar: "https://i.pravatar.cc/150?img=8",
            content: commentInput,
            time: new Date().toISOString(),
          };

          setComments((prev) => [newComment, ...prev]);
          setCommentInput("");
        }
      } catch (err) {
        console.error("Failed to post comment:", err);
      }
    }
  };

  const handleLikeDislike = async (isLikeValue: boolean) => {
    try {
      const res = await api.post("/like/like-video", {
        videoId: id,
        isLike: isLikeValue,
      });
      if (res.data?.success) {
        setIsLiked(isLikeValue);

        setVideos((prev) => {
          const updated = [...prev];
          const video = updated[0];
          updated[0] = {
            ...video,
            totalVideoLikes: isLikeValue
              ? (video.totalVideoLikes || 0) + 1
              : Math.max((video.totalVideoLikes || 1) - 1, 0),
            totalVideoDislikes: !isLikeValue
              ? (video.totalVideoDislikes || 0) + 1
              : Math.max((video.totalVideoDislikes || 1) - 1, 0),
          };
          return updated;
        });
      } else {
        console.error("Like/Dislike API failed:", res.data?.message);
      }
    } catch (err) {
      console.error("Failed to send like/dislike:", err);
    }
  };

  const subscribToggle = async () => {
    try {
      const res = await api.get(`/subscription/${userId}`);
      if (res.data?.success) {
        // alert(res.data.message);
        setSubscribed((prev) => !prev);
      }
    } catch (err) {
      console.error("Failed to toggle subscription:", err);
      alert("Failed to toggle subscription. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        padding: 3,
        backgroundColor: "#0f0f0f",
        color: "#fff",
      }}
    >
      <Box sx={{ flex: 2 }}>
        {mainVideo && (
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: "#1a1a1a",
              p: 2,
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ height: "360px", overflow: "hidden", borderRadius: 1 }}>
              <video
                src={mainVideo.videoFile}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Typography variant="h6" sx={{ mt: 1 }}>
              {mainVideo.title}
            </Typography>
            <Typography variant="body2" color="gray">
              {mainVideo.views || 0} views •{" "}
              {mainVideo.createdAt
                ? formatDistanceToNow(new Date(mainVideo.createdAt), {
                    addSuffix: true,
                  })
                : ""}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <IconButton onClick={() => handleLikeDislike(true)}>
                <ThumbUp
                  sx={{
                    color:
                      isLiked === true || (mainVideo.totalVideoLikes ?? 0) > 0
                        ? "#2196f3"
                        : "#fff",
                  }}
                />
                <Typography variant="caption" sx={{ ml: 0.5, color: "#fff" }}>
                  {mainVideo.totalVideoLikes || 0}
                </Typography>
              </IconButton>

              <IconButton onClick={() => handleLikeDislike(false)}>
                <ThumbDown
                  sx={{
                    color:
                      isLiked === false ||
                      (mainVideo.totalVideoDislikes ?? 0) > 0
                        ? "red"
                        : "#fff",
                  }}
                />
                <Typography variant="caption" sx={{ ml: 0.5, color: "#fff" }}>
                  {mainVideo.totalVideoDislikes || 0}
                </Typography>
              </IconButton>

              <Box
                sx={{
                  mt: 1,
                  justifyContent: "end",
                  flex: 1,
                  display: "flex",
                }}
              >
                <Button
                  onClick={subscribToggle}
                  style={{
                    backgroundColor: subscribed
                      ? "var(--background-color)"
                      : "#d32f2f",
                    color: "#fff",
                  }}
                >
                  {subscribed ? "Subscribe" : "Unsubscribe"}
                </Button>
              </Box>
            </Stack>

            <Divider sx={{ my: 1, borderColor: "#333" }} />

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                alt="user"
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="subtitle2">Channel Name</Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {mainVideo.description}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Comments
              </Typography>

              <Stack direction="row" spacing={2}>
                <Avatar src="https://i.pravatar.cc/150?img=8" />
                <Box sx={{ flex: 1 }}>
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment..."
                    style={{
                      width: "100%",
                      padding: "12px 12px",
                      borderRadius: "20px",
                      background: "#2c2c2c",
                      border: "1px solid #444",
                      color: "#fff",
                    }}
                  />
                </Box>
                <Button onClick={postComment}>Comment</Button>
              </Stack>

              <Box sx={{ mt: 2 }}>
                {comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{ display: "flex", gap: 2, mt: 2 }}
                  >
                    <Avatar src={comment.avatar} />
                    <Box>
                      <Typography variant="subtitle2" color="#fff">
                        {comment.name}{" "}
                        {/* <Typography
                          variant="caption"
                          color="gray"
                          sx={{ ml: 1 }}
                        >
                          {formatDistanceToNow(new Date(comment.time), {
                            addSuffix: true,
                          })}
                        </Typography> */}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Suggested Videos
        </Typography>
        {videos.slice(1).map((video: any) => (
          <Card
            key={video._id}
            sx={{
              display: "flex",
              backgroundColor: "#1f1f1f",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <CardMedia
              component="video"
              src={video.videoFile}
              sx={{ width: 140, height: 80 }}
              muted
              autoPlay
              loop
            />
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {video.title}
              </Typography>
              <Typography variant="caption" color="gray">
                {video.views || 0} views
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default VideoGallery;
