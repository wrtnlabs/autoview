import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export type IInvert = {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | any;
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
            */
            name: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build the lineage (ancestor chain) from root to immediate parent
  const lineage: Array<{ name: string; code: string }> = [];
  let cursor = input.parent as Schema.IShoppingChannelCategory.IInvert | null;
  while (cursor) {
    lineage.push({ name: cursor.name, code: cursor.code });
    // Traverse upward
    cursor = cursor.parent as Schema.IShoppingChannelCategory.IInvert | null;
  }
  // Reverse so that the top-most ancestor comes first
  lineage.reverse();

  // Compose a markdown representation of the parent hierarchy
  const parentSection =
    lineage.length > 0
      ? [
          "### Parent Hierarchy",
          ...lineage.map((item, idx) => `${"  ".repeat(idx)}- ${item.name} (${item.code})`),
        ].join("\n")
      : "### Parent Hierarchy\n- No parent category";

  // Construct the VerticalCard to display the category info
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      // Header with icon, title, and code
      {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
          type: "Icon",
          id: "tags",    // using a tag icon to represent category
          size: 24,
          color: "blue",
        },
      },
      // Content: show parent hierarchy via markdown for better readability
      {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: parentSection,
        },
      },
      // Footer: show creation timestamp in a subtle style
      {
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          content: `Created at: ${input.created_at}`,
          variant: "caption",
          color: "gray",
        },
      },
    ],
  };

  return card;
}
