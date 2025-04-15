import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingChannelCategory {
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
type IAutoViewTransformerInputType = IShoppingChannelCategory.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose a human-friendly markdown text displaying the category's details.
  // We use markdown to format the text for enhanced readability.
  let parentInfo = "None";
  // Check if the parent exists and has a 'name' property.
  if (input.parent && typeof input.parent === "object" && "name" in input.parent) {
    parentInfo = (input.parent as { name?: string }).name || "Unnamed Parent";
  }
  
  // Create markdown content, including category fields.
  const markdownContent = `## Category Details

- **ID:** ${input.id}
- **Code:** ${input.code}
- **Category Name:** ${input.name}
- **Parent ID:** ${input.parent_id ?? "None"}
- **Parent Name:** ${parentInfo}
- **Created At:** ${input.created_at}
`;

  // Compose the UI using a vertical card structure.
  // We include a CardHeader with an icon as the startElement for visual appeal.
  // The CardContent displays the details using a Markdown component.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        // Use an Icon as a visual indicator. The icon id "folder" signifies a category.
        startElement: {
          type: "Icon",
          id: "folder", // This should be a valid kebab-case icon name per the documentation.
          color: "blue",
          size: 24
        }
      },
      {
        type: "CardContent",
        // The childrenProps property here is set to a Markdown component for rich text.
        childrenProps: {
          type: "Markdown",
          content: markdownContent
        }
      }
    ]
  };
}
