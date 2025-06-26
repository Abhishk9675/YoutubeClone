import {
  Box,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HistoryIcon from '@mui/icons-material/History';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CollectionsIcon from '@mui/icons-material/Collections';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/home' },
  { label: 'Liked Videos', icon: <ThumbUpIcon />, path: '/liked' },
  { label: 'History', icon: <HistoryIcon />, path: '/watch-history' },
  { label: 'My Content', icon: <VideoLibraryIcon />, path: '/my-content' },
  { label: 'Collections', icon: <CollectionsIcon />, path: '/collections' },
  { label: 'Subscribers', icon: <PeopleAltIcon />, path: '/subscribers' },
];

const bottomItems = [
  { label: 'Support', icon: <SupportAgentIcon />, path: '/support' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const SideBar = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const compactSidebarRoutes = [
    '/video/',
    '/watch-history',
    '/liked',
    '/collections',
    '/subscribers',
    '/my-content',
    '/settings',
    '/support',
  ];

  const isCompactPage =
    compactSidebarRoutes.some((path) => location.pathname.startsWith(path)) ||
    /^\/video\/.+/.test(location.pathname);

  const showCompact = isCompactPage || isMediumScreen;
  const isExpanded = !showCompact || hovered;

  const isActive = (path: string) => location.pathname === path;

  const buttonStyle = (active: boolean) => ({
    justifyContent: isExpanded ? 'flex-start' : 'center',
    color: active ? 'var(--textHover-color)' : 'var(--text-color)',
    backgroundColor: active ? 'var(--backgroundHover-color)' : 'transparent',
    borderColor: active ? 'var(--textHover-color)' : 'var(--text-color)',
    fontWeight: active ? 'bold' : 'normal',
    borderRadius: '0',
    textTransform: 'none',
    padding: '0.5rem 1rem',
    minWidth: 'auto',
    '& .MuiButton-startIcon': {
      margin: isExpanded ? undefined : '0',
    },
    '&:hover': {
      backgroundColor: 'var(--backgroundHover-color)',
      color: 'var(--textHover-color)',
    },
  });

  return (
    <Box
      sx={{
        width: isExpanded ? '250px' : '80px',
        maxHeight: '100vh',
        backgroundColor: 'var(--bodyBackground-color)',
        borderRight: '2px solid var(--border-color)',
        padding: '1rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s ease',
        position: 'relative',
        zIndex: hovered ? 111 : 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >


      <Stack spacing={1}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            onClick={() => navigate(item.path)}
            variant="outlined"
            startIcon={item.icon}
            sx={buttonStyle(isActive(item.path))}
            fullWidth
          >
            {isExpanded && item.label}
          </Button>
        ))}
      </Stack>

      <Stack spacing={1} mt={4}>
        <Divider sx={{ borderColor: 'var(--border-color)' }} />
        {bottomItems.map((item, index) => {
          const showTooltip = item.label === 'Support' || item.label === 'Settings';
          const button = (
            <Button
              key={index}
              variant="outlined"
              startIcon={item.icon}
              sx={buttonStyle(isActive(item.path))}
              fullWidth
            >
              {isExpanded && item.label}
            </Button>
          );

          return showTooltip ? (
            <Tooltip key={item.label} title="Coming Soon" placement="right">
              <Box>{button}</Box>
            </Tooltip>
          ) : (
            button
          );
        })}
      </Stack>
    </Box>
  );
};

export default SideBar;
