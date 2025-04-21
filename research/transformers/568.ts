import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Project columns contain cards of work.
     *
     * @title Project Column
    */
    export type project_column = {
        url: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
        cards_url: string & tags.Format<"uri">;
        /**
         * The unique identifier of the project column
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project column
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.project_column[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no columns are present, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No Project Columns\n\nThere are no project columns to display.",
    };
  }

  // Map each project column into a ListItem component for visual display.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((col) => {
    // Format the updated_at timestamp for user readability.
    // You may adjust locale or formatting options as needed.
    const updatedAt = new Date(col.updated_at).toLocaleString();

    return {
      type: "ListItem",
      title: col.name,
      description: `Last updated: ${updatedAt}`,
      // An icon to visually represent the column.
      startElement: {
        type: "Icon",
        id: "folder",
        size: 24,
        color: "blue",
      },
      // A directional arrow to indicate this item is clickable.
      endElement: {
        type: "Icon",
        id: "arrow-right",
        size: 20,
        color: "gray",
      },
      // Link the entire list item to the project's column URL.
      href: col.url,
    };
  });

  // Return a responsive list of the project columns.
  return {
    type: "List",
    childrenProps: listItems,
  };
}
