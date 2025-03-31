import { IAutoViewComponentProps } from "@autoview/interface";

import { Avatar, AvatarGroup } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
  HorizontalCard,
  VerticalCard,
} from "./card";
import { Carousel } from "./carousel";
import { Chip, ChipGroup } from "./chip";
import { Collapse, CollapseContent, CollapseHeader } from "./collapse";
import { DataList, DataListItem } from "./data-list";
import { Divider } from "./divider";
import { Icon } from "./icon";
import { IconButton } from "./icon-button";
import { Image } from "./image";
import { List, ListItem, ListSubheader } from "./list";
import { Markdown } from "./markdown";
import { Text } from "./text";
import { Tooltip } from "./tooltip";

export const componentMap: Record<IAutoViewComponentProps["type"], any> = {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
  Carousel,
  Chip,
  ChipGroup,
  Collapse,
  CollapseContent,
  CollapseHeader,
  DataList,
  DataListItem,
  Divider,
  HorizontalCard,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  ListSubheader,
  Markdown,
  Text,
  Tooltip,
  VerticalCard,
};
