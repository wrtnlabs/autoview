import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Code Frequency Stat
     *
     * @title Code Frequency Stat
    */
    export type code_frequency_stat = (number & tags.Type<"int32">)[];
}
type IAutoViewTransformerInputType = Schema.code_frequency_stat[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "#### No code frequency data available."
    };
  }

  // We'll only display the most recent 20 weeks to keep it concise and mobile-friendly
  const recentWeeks = input.slice(-20);

  // Transform each week entry ([timestamp, additions, deletions]) into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = recentWeeks.map((week) => {
    // Validate shape: we expect at least three numbers per entry
    if (!Array.isArray(week) || week.length < 3) {
      return {
        type: "DataListItem",
        label: [{ type: "Text", content: "Invalid data", variant: "body2" }]
      };
    }

    const [timestamp, additions, deletions] = week;
    // Convert Unix timestamp (seconds) into a readable date
    const dateLabel = new Date(timestamp * 1000).toLocaleDateString();

    // Icons for positive and negative changes
    const plusIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "plus",
      color: "green",
      size: 12
    };
    const minusIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "minus",
      color: "red",
      size: 12
    };

    // Chips to display additions and deletions
    const addChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `+${additions}`,
      color: "success",
      size: "small",
      variant: "filled",
      startElement: plusIcon
    };
    const delChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `-${Math.abs(deletions)}`,
      color: "error",
      size: "small",
      variant: "filled",
      startElement: minusIcon
    };

    return {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: dateLabel,
          variant: "body2"
        }
      ],
      value: [addChip, delChip]
    };
  });

  // Wrap all items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // A header for the card with an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Code Frequency Stats",
    startElement: {
      type: "Icon",
      id: "code-branch",
      color: "blue",
      size: 16
    }
  };

  // The content of the card containing our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Return a vertical card combining the header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
