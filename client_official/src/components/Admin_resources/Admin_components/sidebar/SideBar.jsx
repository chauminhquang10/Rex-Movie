import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  BarChart,
  AttachMoney,
  PlayCircleOutline,
  PermIdentity,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Payment,
  LocalOffer,
} from "@material-ui/icons";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import InventoryIcon from "@mui/icons-material/Inventory";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem ">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/genres" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Genres
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/payments" className="link">
              <li className="sidebarListItem">
                <Payment className="sidebarIcon" />
                Payments
              </li>
            </Link>
            <Link to="/actors" className="link">
              <li className="sidebarListItem">
                <GroupsIcon className="sidebarIcon" />
                Actors
              </li>
            </Link>
            <Link to="/directors" className="link">
              <li className="sidebarListItem">
                <AccessibilityIcon className="sidebarIcon" />
                Directors
              </li>
            </Link>
            <Link to="/packages" className="link">
              <li className="sidebarListItem">
                <InventoryIcon className="sidebarIcon" />
                Packages
              </li>
            </Link>
            <Link to="/discounts" className="link">
              <li className="sidebarListItem">
                <LocalOffer className="sidebarIcon" />
                Discounts
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifycations</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
