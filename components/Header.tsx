// AppMenu.tsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VideoComponent from '../components/Home/VideoComponent/VideoComponent';

export default function AppMenu() {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1, zIndex: 999 }}>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ 
                            mr: 2 
                            }}
                        onClick={openMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <ConnectButton chainStatus="icon" />
                </Toolbar>
            </AppBar>
            <Popover
                open={Boolean(menuAnchorEl)}
                anchorEl={menuAnchorEl}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    opacity:'80%',
            
                }}
            
            >
                <VideoComponent signatureCompleted={true} />
            </Popover>
        </Box>
    );
}