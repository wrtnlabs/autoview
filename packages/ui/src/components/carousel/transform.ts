import { IAutoViewCarouselProps } from "@autoview/interface";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export function transformCarouselOptions(
  props: TransformToComponentProps<IAutoViewCarouselProps>,
): EmblaOptionsType {
  return {
    loop: props.infinite ?? true,
    duration: props.interval ?? 25,
  };
}

export function transformCarouselPlugins(
  props: TransformToComponentProps<IAutoViewCarouselProps>,
): EmblaPluginType[] {
  const autoPlay = props.autoPlay ? Autoplay() : null;
  const fade = props.effect === "fade" ? Fade() : null;

  return [autoPlay, fade].filter((i) => i != null);
}

export function transformCarouselProps(
  props: TransformToComponentProps<IAutoViewCarouselProps>,
): [EmblaOptionsType, EmblaPluginType[]] {
  return [transformCarouselOptions(props), transformCarouselPlugins(props)];
}
