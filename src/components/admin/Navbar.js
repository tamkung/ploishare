import React, { useState, useEffect } from 'react';

import { Drawer } from 'antd';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import MenuMui from '@mui/material/Menu';
import TypographyM from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);

    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>

            <Drawer placement="left" onClose={onClose} open={open} >
                <Link to={'/admin'}>Home</Link>
                <br />
                <Link to={'/admin/listrental'}>ListRental</Link>
            </Drawer>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={showDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <TypographyM variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin
                    </TypographyM>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <MenuMui
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => { }}>Profile</MenuItem>
                                <MenuItem onClick={() => { }}>My account</MenuItem>
                                <MenuItem onClick={() => { window.location = "/" }}>Logout</MenuItem>
                            </MenuMui>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Navbar;