import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../../src/properties/theme";

export interface IAutoViewLetterAvatarProps
  extends IAutoViewComponentPropsBase<"LetterAvatar"> {
  name: string;
  color?: IAutoViewColor.IScale | IAutoViewColor.IHex;
  size?: IAutoViewLetterAvatarProps.ISize;
}

export namespace IAutoViewLetterAvatarProps {
  export type IColor = string;
  export type ISize = 12 | 16 | 20 | 24 | 32 | 40;
}
