import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../Auth/login";
import Signup from "../Auth/signup";
import Forgot from "../Auth/forgot";
import Layout from "../Layout/layout";
import VideoPlayer from "../pages/videoPlayer";
import WatchHistory from "../pages/watchHistory";
import MyContent from "../pages/myContent";
import LikedVideo from "../pages/LikedVideo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<Forgot />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/my-content" element={<MyContent />} />
        <Route path="/liked" element={<LikedVideo />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
