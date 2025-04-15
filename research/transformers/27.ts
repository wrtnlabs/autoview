import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
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
type IAutoViewTransformerInputType = IShoppingChannelCategory.IHierarchical[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // This helper function recursively transforms a category into a DataListItem component.
  function transformCategory(category: IShoppingChannelCategory.IHierarchical): IAutoView.IAutoViewDataListItemProps {
    // Create an icon component to visually represent a category.
    const icon: IAutoView.IAutoViewIconProps = {
      id: "folder", // using a folder icon to represent a category
      type: "Icon",
      size: 16,
      color: "blue" // chosen color; adjust as needed for your theme
    };

    // Create a markdown component for the category name (in bold).
    const markdownHeader: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**${category.name}**`
    };

    // Create a markdown component to display additional details (code and creation date)
    const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `Code: \`${category.code}\`\nCreated At: ${new Date(category.created_at).toLocaleString()}`
    };

    // If the category has children, recursively process them into a nested DataList.
    let childrenComponent: IAutoView.IAutoViewDataListProps | undefined = undefined;
    if (Array.isArray(category.children) && category.children.length > 0) {
      childrenComponent = {
        type: "DataList",
        childrenProps: category.children.map(transformCategory)
      };
    }

    // Assemble the DataList item.
    // For the label, we include the icon and the markdown header.
    // For the value, we include the details and if available, the nested list of children.
    const dataListItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: [icon, markdownHeader],
      value: childrenComponent ? [detailsMarkdown, childrenComponent] : detailsMarkdown
    };

    return dataListItem;
  }

  // If no data is provided, render a fallback markdown component that informs the user.
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "No category data available."
    };
  }

  // Transform the top-level list of categories into a DataList component.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: input.map(transformCategory)
  };

  // Return the composed DataList which is of type IAutoView.IAutoViewComponentProps.
  return dataList;
}
