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
  // We choose a vertical card to present the category information in a visually appealing and responsive way.
  // The card consists of a header, content, and, if available, a footer that displays parent category info.
  
  // Header: Displays the category name and code.
  // We include an icon (e.g., a "tag") in the header's startElement to add visual context.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Code: ${input.code}`,
    startElement: {
      type: "Icon",
      id: "tag", // Assumes the "tag" icon (in kebab-case) is available from our icon set.
      color: "blue",
      size: 24
    }
  };

  // Content: Uses a Markdown component to visually present details.
  // Markdown is preferred over plain text for readability and formatting flexibility.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: `## Category Details

- **ID:** ${input.id}
- **Created At:** ${input.created_at}`
    }
  };

  // Footer: If the input has a parent category, display it using a Chip component for an engaging UI.
  // The Chip component here clearly identifies the parent category.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.parent && input.parent.name) {
    cardFooter = {
      type: "CardFooter",
      childrenProps: {
        type: "Chip",
        label: `Parent: ${input.parent.name}`
      }
    };
  }

  // Assemble the vertical card with header, content, and optionally the footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardFooter
      ? [cardHeader, cardContent, cardFooter]
      : [cardHeader, cardContent]
  };

  // Return the composed UI component that conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
