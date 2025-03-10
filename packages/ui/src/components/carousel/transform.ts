import { IAutoViewCarouselProps } from "@autoview/interface";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export function transformCarouselOptions(
  props: IAutoViewCarouselProps,
): EmblaOptionsType {
  return {
    loop: props.infinite ?? true,
    duration: props.interval ?? 3000,
  };
}

export function transformCarouselPlugins(
  props: IAutoViewCarouselProps,
): EmblaPluginType[] {
  const autoPlay = props.autoPlay ? Autoplay() : null;
  const fade = props.effect === "fade" ? Fade() : null;

  return [autoPlay, fade].filter((i) => i != null);
}

export function transformCarouselProps(
  props: IAutoViewCarouselProps,
): [EmblaOptionsType, EmblaPluginType[]] {
  return [transformCarouselOptions(props), transformCarouselPlugins(props)];
}
