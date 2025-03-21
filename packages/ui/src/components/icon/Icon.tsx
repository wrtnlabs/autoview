import { IAutoViewIconProps } from "@autoview/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { transformIconProps } from "./transform";

export const Icon = (props: IAutoViewIconProps) => {
  try {
    return <FontAwesomeIcon icon={transformIconProps(props)} />;
  } catch {
    return null;
  }
};
