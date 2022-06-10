import React from "react";
import './Sidebar.css'

import SidebarOption from "./SidebarOption";
import { Outlet, Link } from "react-router-dom";
// icons
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Button } from "@mui/material";
// import TwitterIcon from '@mui/icons-material/Twitter';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WebIcon from '@mui/icons-material/Web';

function test(){
    console.log("hey")
}

function Sidebar() {
    return (
        <div className="sidebar">
            {/** James icon */}
            {/* <HomeIcon /> */}
            {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
            <h2 className="projects">Projects</h2>

            <SidebarOption Icon={DirectionsCarIcon} text="Self-Driving Car"/>

            <SidebarOption Icon={WebIcon}           href="google2.com" text="Sir Ken Robinson's Tribute Page"/>
            <SidebarOption Icon={WebIcon}           href="google3.com" text="Game Online Squad Survey Form"/>
            {/* <SidebarOption Icon={PermIdentityIcon} text="Profile"/> */}

            {/** SidebarOption */}
            {/** SidebarOption */}
            {/** SidebarOption */}
            {/** SidebarOption */}
            {/** SidebarOption */}

            {/** Button -> Tweet */}
            <Button variant="outlined" className="sidebar__tweet" fullWidth>Press one of the above links!</Button>

        </div>
    );

}


export default Sidebar

