import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import React from "react";

import { Image } from "../../../components/image";

type SampleProps = {
  style?: React.CSSProperties;
};

export function DefaultCard({ style }: SampleProps) {
  return (
    <Card style={style}>
      <CardHeader
        avatar="avatar"
        action={<button style={{ background: "blue" }}>hi</button>}
        content="content"
        title="title"
        subheader="subheader"
        sx={{ backgroundColor: "red" }}
      />
      <CardMedia
        sx={{ backgroundColor: "green", height: "200px" }}
        image="https://images.unsplash.com/photo-1732919258508-3fd53a8007b6?q=80&w=2646&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        {/* <Image
          type="Image"
          src="https://images.unsplash.com/photo-1732919258508-3fd53a8007b6?q=80&w=2646&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        /> */}
      </CardMedia>
      <CardContent sx={{ backgroundColor: "yellow" }}>
        Content는 children / slot 없음
      </CardContent>
      <CardActions sx={{ backgroundColor: "blue" }}>
        Action도 children / slot 없음
      </CardActions>
    </Card>
  );
}

export function HorizontalCard({ style }: SampleProps) {
  return (
    <Card style={style} sx={{ display: "flex" }}>
      <CardMedia
        sx={{
          backgroundColor: "green",
          width: "120px",
          height: "100%",
          flexShrink: 0,
        }}
        component="img"
        image="https://images.unsplash.com/photo-1732919258508-3fd53a8007b6?q=80&w=2646&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <CardContent sx={{ width: "100%", backgroundColor: "yellow" }}>
        <CardHeader
          avatar="avatar"
          action={<button style={{ background: "blue" }}>hi</button>}
          content="content"
          title="title"
          subheader="subheader"
          sx={{ backgroundColor: "red" }}
        />
        {/* <CardContent>Content는 children / slot 없음</CardContent> */}
        <CardActions sx={{ backgroundColor: "blue" }}>
          Action도 children / slot 없음
        </CardActions>
      </CardContent>
    </Card>
  );
}
