import { useMediaQuery, Box, Drawer, Typography } from '@mui/material';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import { Sidebar } from 'react-mui-sidebar';
import logo from '../../../assets/images/logos/dark1-logo.png';

const MSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  const LogoWithText = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, // Space between logo and text
        padding: '16px', // Add padding around the logo section
      }}
    >
      {/* Logo Image */}
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '40px', // Resize logo
          height: '40px',
        }}
      />
      {/* Text */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#5d87ff', // Text color
        }}
      >
        DuDi Software
      </Typography>
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <LogoWithText />
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={'270px'}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}
        <LogoWithText />
        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        <SidebarItems />
        <Upgrade />
      </Sidebar>
    </Drawer>
  );
};

export default MSidebar;