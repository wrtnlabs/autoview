import { IAutoViewNonSurfaceComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewCardProps
  extends IAutoViewComponentPropsBase<"Card"> {
  children: IAutoViewCardProps.IChildren[];
  borderRadius: number;
}

export interface IAutoViewCardActionAreaProps
  extends IAutoViewComponentPropsBase<"CardActionArea"> {
  children: IAutoViewNonSurfaceComponentProps[];
}

export interface IAutoViewCardActionsProps
  extends IAutoViewComponentPropsBase<"CardActions"> {
  children: IAutoViewNonSurfaceComponentProps[];
}

export interface IAutoViewCardContentProps
  extends IAutoViewComponentPropsBase<"CardContent"> {
  children: IAutoViewNonSurfaceComponentProps[];
}

export interface IAutoViewCardHeaderProps
  extends IAutoViewComponentPropsBase<"CardHeader"> {
  children: IAutoViewNonSurfaceComponentProps[];
}

export interface IAutoViewCardMediaProps
  extends IAutoViewComponentPropsBase<"CardMedia"> {
  children: IAutoViewNonSurfaceComponentProps[];
}

export namespace IAutoViewCardProps {
  export type IChildren =
    | IAutoViewCardActionAreaProps
    | IAutoViewCardActionsProps
    | IAutoViewCardContentProps
    | IAutoViewCardHeaderProps
    | IAutoViewCardMediaProps;
}
