import { IAutoViewComponentProps } from "@autoview/interface";

import { Badge } from "./badge";
import { Carousel } from "./carousel";
import { Chip } from "./chip";
import { Collapse } from "./collapse";
import { Divider } from "./divider";
import { GridList } from "./grid-list";
import { Icon } from "./icon";
import { Image } from "./image";
import { ImageAvatar } from "./image-avatar";
import { LetterAvatar } from "./letter-avatar";
import { StackedList } from "./stacked-list";
import { Stats } from "./stats";
import { Tag } from "./tag";
import { Typography } from "./typography";

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
  StackedList,
  Stats,
  Typography,
  Tag,
};
