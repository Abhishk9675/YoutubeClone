import Header from '../Components/header';
import SideBar from '../Components/sideBar';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Header />
      </Box>

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {!isSmallScreen && <SideBar />}

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            maxWidth: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
