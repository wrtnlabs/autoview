import { Avatar, AvatarGroup } from "@mui/material";
import { blue, orange, yellow } from "@mui/material/colors";
import React from "react";

import { Image } from "../../../components/image";

export function DefaultAvatarGroup() {
  return (
    <AvatarGroup>
      <Avatar src="https://plus.unsplash.com/premium_photo-1732835069897-f755f62ea9ff?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Avatar sx={{ bgcolor: blue[500] }} />
      <Avatar sx={{ bgcolor: yellow[700] }} />
      <Avatar sx={{ bgcolor: orange[800] }} />
    </AvatarGroup>
  );
}

export function AvatarGroupTotal() {
  return (
    <AvatarGroup total={23}>
      <Avatar
        component="div"
        src="https://plus.unsplash.com/premium_photo-1732835069897-f755f62ea9ff?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sx={{ width: 32, height: 32 }}
      />
      <Avatar sx={{ bgcolor: blue[500] }} />
      <Avatar sx={{ bgcolor: yellow[700] }} />
      <Avatar sx={{ bgcolor: orange[800] }} />
    </AvatarGroup>
  );
}
