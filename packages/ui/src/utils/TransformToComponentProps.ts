import { IAutoViewComponentProps } from "@autoview/interface";
import { HTMLAttributes } from "react";

type CommonHTMLElementProps<T extends HTMLElement = HTMLDivElement> =
  HTMLAttributes<T>;

export type TransformToComponentProps<
  Props extends { type: IAutoViewComponentProps["type"] },
> = Omit<Props, "type"> &
  CommonHTMLElementProps & {
    type?: string;
  };
