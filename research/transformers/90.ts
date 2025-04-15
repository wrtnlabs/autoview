import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingChannel {
    /**
     * Hierarchical channel information with children categories.
    */
    export type IHierarchical = {
        /**
         * Children categories with hierarchical structure.
         *
         * @title Children categories with hierarchical structure
        */
        categories: IShoppingChannelCategory.IHierarchical[];
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Name of the channel.
         *
         * @title Name of the channel
        */
        name: string;
    };
}
namespace IShoppingChannelCategory {
    /**
     * Hierarchical category information with children categories.
    */
    export type IHierarchical = {
        /**
         * List of children categories with hierarchical structure.
         *
         * @title List of children categories with hierarchical structure
        */
        children: IShoppingChannelCategory.IHierarchical[];
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
type IAutoViewTransformerInputType = IShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



  
// Recursive helper function to generate markdown representation of a category tree.
// This function transforms an array of category objects into an indented markdown list.
function generateCategoriesMarkdown(
  categories: IShoppingChannel.IHierarchical["categories"],
  indent: number = 0
): string {
  // Use spaces for indentation; two spaces per indent level.
  const indentStr = "  ".repeat(indent);
  let markdown = "";
  
  for (const category of categories) {
    // Each category bullet: display category name and code.
    markdown += `${indentStr}- **${category.name}** (Code: ${category.code})\n`;
    // If the category has children, recursively generate their markdown.
    if (category.children && category.children.length > 0) {
      markdown += generateCategoriesMarkdown(category.children, indent + 1);
    }
  }
  
  return markdown;
}
  
function visualizeData(input: IShoppingChannel.IHierarchical): IAutoView.IAutoViewComponentProps {
  // Create a Card Header to display the main channel info:
  // Displays the channel name as the title; the channel code and creation time as part of the description.
  // The startElement utilizes an icon representing a shopping theme.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `**Channel Code:** ${input.code}\n**Created At:** ${input.created_at}`,
    startElement: {
      type: "Icon",
      id: "shopping-bag", // Assumes an icon with this id exists in the icon library.
      color: "blue",
      size: 24,
    }
  };
  
  // Generate markdown content for the channel's categories.
  // If no categories are present, indicate that no categories are available.
  let markdownContent: string;
  if (input.categories && input.categories.length > 0) {
    markdownContent = `### Categories\n${generateCategoriesMarkdown(input.categories)}`;
  } else {
    markdownContent = "### Categories\n_No categories available._";
  }
  
  // Create a Markdown component to visually display the category tree.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownContent,
  };
  
  // Wrap the markdown component in a Card Content container.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The childrenProps accepts an array of presentation components.
    childrenProps: [ markdownComponent ]
  };
  
  // Compose a Vertical Card component that contains the header and content,
  // providing a visually engaging, responsive layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [ cardHeader, cardContent ]
  };
  
  // Return the composed component which conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
  
