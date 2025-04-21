import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingMileage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Convert ISO timestamp to a localized string for display
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Determine icon direction and color based on mileage direction
  const directionIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    color: input.direction === 1 ? "green" : "red",
    size: 24,
  };

  // Represent the mileage value; fallback to a neutral Chip if null
  const mileageValueComponent:
    | IAutoView.IAutoViewTextProps
    | IAutoView.IAutoViewChipProps = input.value !== null
    ? {
        type: "Text",
        variant: "body1",
        // Use the number directly as content
        content: input.value.toString(),
      }
    : {
        type: "Chip",
        label: "N/A",
        variant: "outlined",
        color: "gray",
        size: "small",
      };

  // Build a DataList to show Source and Value fields
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Label rendered as Text component
        label: [
          {
            type: "Text",
            variant: "body2",
            content: "Source",
          },
        ],
        // Value rendered similarly
        value: [
          {
            type: "Text",
            variant: "body1",
            content: input.source,
          },
        ],
      },
      {
        type: "DataListItem",
        label: [
          {
            type: "Text",
            variant: "body2",
            content: "Value",
          },
        ],
        value: mileageValueComponent,
      },
    ],
  };

  // Compose a VerticalCard to visually present the mileage record
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with code and creation date, with an icon indicating direction
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        startElement: directionIcon,
      },
      {
        // Main content area containing our details list
        type: "CardContent",
        childrenProps: [detailsList],
      },
    ],
  };

  return card;
}
