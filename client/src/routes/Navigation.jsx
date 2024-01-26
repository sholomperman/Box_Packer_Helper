import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(pathname);

  React.useEffect(() => {
    setValue(pathname)
    window.scrollTo(0, 0);
  }, [pathname])
  return (
    <Box sx={{ width: '100%', height: 30 }}>
      <BottomNavigation
        showLabels
        style={{position: 'fixed', bottom: '0', height: 80, width: '100%'}}
        value={value}
      >
        <BottomNavigationAction
        label="Home" 
        onClick={()=> navigate('/')} 
        icon={<HomeIcon />} 
        value="/"
        />
        <BottomNavigationAction 
        label="New" 
        onClick={()=> navigate('/edit')} 
        icon={<AddIcon />} 
        value="/edit"
        />
        <BottomNavigationAction 
        label="Search" 
        onClick={()=> navigate('/search')} 
        icon={<CalculateIcon />} 
        value="/search"
        />
      </BottomNavigation>
    </Box>
  );
}
