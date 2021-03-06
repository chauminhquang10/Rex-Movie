import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./WidgetSmall.css";
import axios from "axios";
import { Visibility } from "@material-ui/icons";

import { Link } from "react-router-dom";

const WidgetSmall = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/user/newUsers", {
          headers: {
            Authorization: token,
          },
        });
        setNewUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, [token]);
  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Join Members</span>
      <ul className="widgetSmallList">
        {newUsers.map((user) => (
          <li className="widgetSmallListItem">
            <img
              src={
                user.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              className="widgetSmallImg"
            ></img>
            <div className="widgetSmallUser">
              <span className="widgetSmallUsername">
                {user.name.replace(/\w\S*/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )}
              </span>
            </div>
            <Link to={`/edit_user/${user._id}`}>
              <button className="widgetSmallButton">
                <Visibility className="widgetSmallIcon"></Visibility>
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSmall;
