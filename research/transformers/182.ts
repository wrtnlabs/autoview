import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type MeetWrapUpTimeView = {
    channel?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    managers?: {
        [key: string]: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int64"
        }>;
    };
};
type IAutoViewTransformerInputType = MeetWrapUpTimeView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a header for the card with an illustrative icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Wrap-Up Time Overview",
    description: "An overview of the wrap-up time values for channel and managers.",
    // Using an icon to visually represent that this is a time/overview card.
    startElement: {
      type: "Icon",
      id: "clock", // Expecting the icon name "clock" in kebab-case (without the fa prefix).
      color: "blue",
      size: 24,
    }
  };

  // Prepare the list items array to hold channel and managers data.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // If a channel value is provided, add it as a list item.
  if (typeof input.channel === "number") {
    dataListItems.push({
      type: "DataListItem",
      // Using a markdown component to allow better text styling.
      label: {
        type: "Markdown",
        content: "**Channel**"
      },
      // Using a text component with visual emphasis on the channel number.
      value: {
        type: "Text",
        content: `${input.channel}`,
        variant: "body1",
        color: "primary"
      }
    });
  }

  // If managers object is provided, iterate over its entries.
  if (input.managers && typeof input.managers === "object") {
    Object.keys(input.managers).forEach(key => {
      const managerValue = input.managers ? input.managers[key] : undefined;
      // Validate that managerValue is a number for safety.
      if (typeof managerValue === "number") {
        dataListItems.push({
          type: "DataListItem",
          label: {
            type: "Markdown",
            content: `**Manager: ${key}**`
          },
          value: {
            type: "Text",
            content: `${managerValue}`,
            variant: "body1",
            color: "primary"
          }
        });
      }
    });
  }
  
  // In case there is no channel and no managers data, provide a fallback item.
  if (dataListItems.length === 0) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**No Data Available**"
      },
      value: {
        type: "Text",
        content: "There is no wrap-up time information to display.",
        variant: "body2",
        color: "gray"
      }
    });
  }

  // Assemble the DataList component to display the items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Create the card content wrapping the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Compose the main vertical card.
  // The VerticalCard is designed to be responsive and suitable for mobile and web views.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed UI component.
  return verticalCard;
}
