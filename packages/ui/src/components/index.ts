import { IAutoViewComponentProps } from "@autoview/interface";

import { Badge } from "./badge";
import { Card, CardActions, CardContent, CardHeader, CardMedia } from "./card";
import { Carousel } from "./carousel";
import { Chip } from "./chip";
import { Collapse } from "./collapse";
import { Divider } from "./divider";
import { GridList } from "./grid-list";
import { Icon } from "./icon";
import { Image } from "./image";
import { ImageAvatar } from "./image-avatar";
import { LetterAvatar } from "./letter-avatar";
import { Stack } from "./stack";
import { StackedList } from "./stacked-list";
import { Stats } from "./stats";
import { Text } from "./text";

export const componentMap: Record<IAutoViewComponentProps["type"], any> = {
  Badge,
  Carousel,
  Chip,
  Collapse,
  Divider,
  GridList,
  Icon,
  Image,
  ImageAvatar,
  LetterAvatar,
  Stack,
  StackedList,
  Stats,
  Text,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
};
