import { IAutoViewComponentProps } from "@autoview/interface";

import { Badge } from "./badge";
import { Card, CardContent, CardFooter, CardHeader, CardMedia } from "./card";
import { Carousel } from "./carousel";
import { Chip } from "./chip";
import { Collapse } from "./collapse";
import { Divider } from "./divider";
import { Icon } from "./icon";
import { Image } from "./image";
import { Stats } from "./stats";
import { Text } from "./text";

export const componentMap: Record<IAutoViewComponentProps["type"], any> = {
  Badge,
  Carousel,
  Chip,
  Collapse,
  Divider,
  Icon,
  Image,
  Stats,
  Text,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
};
