import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import api from "../Api/axios";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

const UploadDialog = ({ open, onClose }: UploadDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [isPublished, setIsPublished] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setVideoFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const SaveVideo = async () => {
  if (title && description && thumbnail && videoFiles.length > 0) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail as File);
    formData.append("isPublished", String(isPublished));

    videoFiles.forEach((file) => {
      formData.append("videoFile", file);
    });

    try {
      const res = await api.post("/videos/upload-video", formData);

      if (res.data.statusCode === 200) {
        alert("Video uploaded successfully!");

        // ✅ Reset all fields
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setVideoFiles([]);
        setIsPublished(false);

        // ✅ Close dialog
        onClose();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  } else {
    alert("Please fill all required fields before saving.");
  }
};


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box
        sx={{
          backgroundColor: "var(--popupBackground-color, #111827)",
          color: "var(--text-color)",
          px: 6,
          py: 5,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "var(--text-color)",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <DialogTitle sx={{ color: "var(--text-color)", px: 0 }}>
            Upload Videos
          </DialogTitle>
          <DialogActions sx={{ px: 0, mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--background-color)",
                color: "var(--textHover-color)",
                "&:hover": {
                  backgroundColor: "var(--backgroundHover-color)",
                },
              }}
              onClick={SaveVideo}
            >
              Save
            </Button>
          </DialogActions>
        </Stack>

        <DialogContent sx={{ px: 2 }}>
          <Box
            sx={{
              border: "2px dashed var(--border-color)",
              borderRadius: 2,
              textAlign: "center",
              py: 4,
              mt: 2,
              cursor: "pointer",
              position: "relative",
              width: "98%",
            }}
            onClick={() =>
              document.getElementById("video-upload-input")?.click()
            }
          >
            <input
              id="video-upload-input"
              type="file"
              multiple
              accept="video/*"
              hidden
              onChange={handleVideoSelect}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/109/109612.png"
              alt="Upload"
              width="64"
              style={{ marginBottom: "10px" }}
            />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Drag and drop video files to upload
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Your videos will be private until you publish them.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--background-color)",
                color: "var(--textHover-color)",
                "&:hover": {
                  backgroundColor: "var(--backgroundHover-color)",
                },
              }}
            >
              Select Files
            </Button>
          </Box>

          {videoFiles.length > 0 && (
            <Box mt={3}>
              <Typography variant="body1" mb={1}>
                Preview
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  p: 1,
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  width: "96%",
                }}
              >
                {videoFiles.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: "180px",
                      backgroundColor: "#111827",
                      p: 1,
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "var(--text-color)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      🎞 {file.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Box mt={3}>
            <Typography variant="body1" mb={1}>
              Thumbnail<span style={{ color: "red" }}>*</span>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              border={1}
              borderColor="var(--border-color)"
              borderRadius={2}
              p={1}
              width={"96%"}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--textHover-color)",
                  "&:hover": {
                    backgroundColor: "var(--backgroundHover-color)",
                  },
                }}
              >
                Choose File
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </Button>
              <Typography variant="body2">
                {thumbnail ? thumbnail.name : "No file chosen"}
              </Typography>
            </Stack>
          </Box>

          <Box mt={3}>
            <Typography variant="body1" mb={1}>
              Title<span style={{ color: "red" }}>*</span>
            </Typography>
            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "96%",
                padding: "10px",
                backgroundColor: "transparent",
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                color: "var(--text-color)",
              }}
            />
          </Box>

          <Box mt={3}>
            <Typography variant="body1" mb={1}>
              Description<span style={{ color: "red" }}>*</span>
            </Typography>
            <textarea
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "96%",
                padding: "10px",
                backgroundColor: "transparent",
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                color: "var(--text-color)",
                minHeight: "96px",
              }}
            />
          </Box>
          <Box mt={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <input
                type="checkbox"
                id="publish-toggle"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ transform: "scale(1.2)", cursor: "pointer" }}
              />
              <label
                htmlFor="publish-toggle"
                style={{ color: "var(--text-color)", cursor: "pointer" }}
              >
                Do you want to publish this video?
              </label>
            </Stack>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UploadDialog;
