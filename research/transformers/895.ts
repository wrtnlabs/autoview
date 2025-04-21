import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Content Traffic
     *
     * @title Content Traffic
    */
    export type content_traffic = {
        path: string;
        title: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.content_traffic[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No content traffic data available.\n\nThere is currently no traffic data to display."
    };
  }

  // Transform each row into a DataListItem with rich visuals.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((row) => {
    // Label section: title and path
    const labelComponents: IAutoView.IAutoViewTextProps[] = [
      {
        type: "Text",
        variant: "subtitle1",
        // Show the page title prominently
        content: row.title
      },
      {
        type: "Text",
        variant: "caption",
        color: "gray",
        // Show the URL or path below the title
        content: row.path
      }
    ];

    // Value section: two chips for count and uniques with icons
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: [
        {
          type: "Chip",
          label: row.count.toString(),
          // Use a chart icon to represent total visits
          startElement: {
            type: "Icon",
            id: "chart-bar",
            size: 16,
            color: "blue"
          },
          color: "primary",
          variant: "filled",
          size: "small"
        },
        {
          type: "Chip",
          label: row.uniques.toString(),
          // Use a user icon to represent unique visitors
          startElement: {
            type: "Icon",
            id: "user",
            size: 16,
            color: "green"
          },
          color: "success",
          variant: "filled",
          size: "small"
        }
      ]
    };

    return {
      type: "DataListItem",
      // Combine the two text components into the label
      label: labelComponents,
      // Show the chip group as the value
      value: chipGroup
    };
  });

  // Wrap the list in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Build a card with a header and the data list for a cohesive look
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Content Traffic",
    description: "Overview of page visits and unique visitors",
    startElement: {
      type: "Icon",
      id: "chart-line", // a line-chart icon to represent traffic
      size: 24,
      color: "blue"
    }
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Place the DataList inside the card content
    childrenProps: dataList
  };

  // Return a vertical card that holds our header and content
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
