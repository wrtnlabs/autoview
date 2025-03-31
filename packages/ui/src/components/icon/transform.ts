import { IAutoViewIconProps, findIconId } from "@autoview/interface";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import * as freeBrandIcons from "@fortawesome/free-brands-svg-icons";
import * as freeSolidIcons from "@fortawesome/free-solid-svg-icons";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

const freeIcons = { ...freeBrandIcons, ...freeSolidIcons };

export function transformIconProps(
  props: TransformToComponentProps<IAutoViewIconProps>,
) {
  const { id } = props;
  const camelCaseId = convertToCamelCase(findIconId(id));
  return freeIcons[camelCaseId] as freeBrandIcons.IconDefinition;
}

function convertToCamelCase(id: IconName): keyof typeof freeIcons {
  const words = id.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return `fa${capitalizedWords.join("")}` as keyof typeof freeIcons;
}
