import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LandScapeLogo from '../img/landscape-logo.png'
import Login from '../components/Login';
import Vertify from '../components/Vertify';
import ForgotPass from '../components/ForgotPass';
import { Padding } from '@mui/icons-material';
import { positions } from '@mui/system';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 " >
            <div className="w-full max-w-md space-y-8 " style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "#282828 0px 5px 10px" }}>
                <img
                    className="mx-auto h-auto w-auto"
                    src={LandScapeLogo}
                    alt="ปล่อย Share Logo"
                    style={{ width: '250px', height: '160px' }}
                />
                <Box sx={{ width: '100%' }}>
                    <Box style={{ color: "red" }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                            <Tab label="เข้าสู่ระบบ" {...a11yProps(0)} />
                            <Tab label="ยืนยันตัวตน" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Login />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Vertify />
                    </TabPanel>

                </Box>
            </div>
        </div>
    )
}