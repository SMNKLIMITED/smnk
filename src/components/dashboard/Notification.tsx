import { Badge,IconButton } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function Notification() {
  return (
      <IconButton>
    <Badge color="primary" variant="dot">
      {true ? (
          <NotificationsActiveIcon />
          ) : (
            
          <NotificationsIcon />
      )}
    </Badge>
      </IconButton>
  );
}

export default Notification;
