import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingMileage = {
    /**
     * Page information.
     *
     * @title Page information
    */
    pagination: IPage.IPagination;
    /**
     * List of records.
     *
     * @title List of records
    */
    data: IShoppingMileage[];
};
namespace IPage {
    /**
     * Page information.
    */
    export type IPagination = {
        /**
         * Current page number.
         *
         * @title Current page number
        */
        current: number & tags.Type<"int32">;
        /**
         * Limitation of records per a page.
         *
         * @title Limitation of records per a page
        */
        limit: number & tags.Type<"int32">;
        /**
         * Total records in the database.
         *
         * @title Total records in the database
        */
        records: number & tags.Type<"int32">;
        /**
         * Total pages.
         *
         * Equal to {@link records} / {@link limit} with ceiling.
         *
         * @title Total pages
        */
        pages: number & tags.Type<"int32">;
    };
}
type IShoppingMileage = {
    id: string & tags.Format<"uuid">;
    value: null | number;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
};
type IAutoViewTransformerInputType = IPageIShoppingMileage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure pagination and data from input for easier reference.
  const { pagination, data } = input;

  // Transform each record into a DataListItem.
  // Each item shows a markdown summary in the label (code and creation date) along with an icon representing the direction,
  // and the value details in the value property.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = data.map((record) => {
    // Choose an icon for the direction: "arrow-up" for a positive direction, "arrow-down" for a negative direction.
    // We also choose icon colors accordingly.
    const directionIconId = record.direction === 1 ? "arrow-up" : "arrow-down";
    const directionIconColor = record.direction === 1 ? "green" : "red";

    // Format the created_at timestamp nicely. This is a simple transformation;
    // if needed, further formatting (using libraries) can be done here.
    const formattedDate = new Date(record.created_at).toLocaleString();

    // Build the label as an array of components:
    // - A Markdown component displaying the code and the formatted creation date.
    // - An Icon component to visually indicate the direction.
    const labelComponents: (IAutoView.IAutoViewMarkdownProps | IAutoView.IAutoViewIconProps)[] = [
      {
        type: "Markdown",
        // Using markdown formatting to emphasize the code and date information.
        // Two new lines are used to separate lines.
        content: `**Code:** ${record.code}\n\n**Created:** ${formattedDate}`
      },
      {
        type: "Icon",
        id: directionIconId,
        size: 16,
        color: directionIconColor
      }
    ];

    // Build the value component with additional details:
    // Use Markdown to render the source and value information.
    const valueContent = `**Source:** ${record.source}\n\n**Value:** ${record.value !== null ? record.value : "N/A"}`;

    return {
      type: "DataListItem",
      label: labelComponents,
      value: {
        type: "Markdown",
        content: valueContent
      }
    };
  });

  // Compose the DataList component holding all the data list items. 
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Compose the card header with a title, a description, and visual elements.
  // The startElement and endElement properties are used to add icons to enhance visual appeal.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Mileage",
    description: `Page ${pagination.current} of ${pagination.pages}\nTotal records: ${pagination.records}`,
    startElement: {
      type: "Icon",
      id: "list", // icon id representing list (assumes the icon exists in the icon library)
      size: 24,
      color: "blue"
    },
    endElement: {
      type: "Icon",
      id: "calendar", // icon representing calendar/time
      size: 24,
      color: "gray"
    }
  };

  // Compose the CardContent component that wraps the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [ dataList ]
  };

  // Finally, wrap everything in a VerticalCard component which is responsive and adapts well to mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [ cardHeader, cardContent ]
  };

  // Return the fully composed component structure.
  return verticalCard;
}
