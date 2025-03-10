import { IAutoViewIconProps } from "@autoview/interface";
import {
  ArrowDownward,
  ArrowLeft,
  ArrowRight,
  ArrowUpward,
  Check,
  CheckCircle,
  Close,
  Home,
  Menu,
  Search,
} from "@mui/icons-material";
import React from "react";

// TODO: Must refactor the code.
// The code below is strictly restrained for testing purposes.
export const Icon = ({ name, size }: IAutoViewIconProps) => {
  if (name === "arrow-down") {
    return <ArrowDownward width={size} height={size} />;
  }

  if (name === "arrow-left") {
    return <ArrowLeft width={size} height={size} />;
  }

  if (name === "arrow-right") {
    return <ArrowRight width={size} height={size} />;
  }

  if (name === "arrow-up") {
    return <ArrowUpward width={size} height={size} />;
  }

  if (name === "check") {
    return <Check width={size} height={size} />;
  }

  if (name === "circle-check") {
    return <CheckCircle width={size} height={size} />;
  }

  if (name === "close") {
    return <Close width={size} height={size} />;
  }

  if (name === "home") {
    return <Home width={size} height={size} />;
  }

  if (name === "menu") {
    return <Menu width={size} height={size} />;
  }

  if (name === "search") {
    return <Search width={size} height={size} />;
  }

  return null;
};
