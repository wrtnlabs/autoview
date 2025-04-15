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



// Helper function to recursively transform a hierarchical category into a DataListItem
function transformCategory(category: IShoppingChannelCategory.IHierarchical): IAutoView.IAutoViewDataListItemProps {
  // Create a Markdown component to display the category name with an emoji icon.
  // Using Markdown allows us to use rich text formatting.
  const markdownLabel: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `🗂️ **${category.name}**`
  };

  // Initialize the DataListItem with the Markdown label.
  const dataListItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: markdownLabel
  };

  // If the category has children, transform them recursively into a nested DataList.
  if (category.children && category.children.length > 0) {
    const nestedDataListItems = category.children.map(child => transformCategory(child));
    // Create a nested DataList component to hold the children.
    const nestedDataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: nestedDataListItems
    };
    dataListItem.value = nestedDataList;
  }

  return dataListItem;
}

function visualizeData(input: IShoppingChannelCategory.IHierarchical[]): IAutoView.IAutoViewComponentProps {
  // Aggregate the main DataList items. If input is empty, provide a fallback message.
  let dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (input && input.length > 0) {
    dataListItems = input.map(category => transformCategory(category));
  } else {
    // Fallback: when no categories are provided, show a DataListItem with a friendly Markdown message.
    const fallbackMessage: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "_No categories available._"
    };
    dataListItems.push({
      type: "DataListItem",
      label: fallbackMessage
    });
  }

  // Compose the main DataList component which holds all category items.
  const categoriesDataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // To improve visual engagement and responsiveness on all devices,
  // wrap the DataList inside a VerticalCard which provides a header and content area.
  // CardHeader displays a title and an icon for better visualization.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Product Categories",
    // startElement only accepts specific types such as Icon, so we provide an Icon component.
    startElement: {
      type: "Icon",
      id: "list", // Assuming "list" is a valid icon identifier in kebab-case without any prefix.
      color: "blue",
      size: 24
    }
  };

  // CardContent holds the primary display components and here we use our DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: categoriesDataList // DataList is a valid presentation component
  };

  // Compose the final VerticalCard that aggregates the header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the composed visual component structure.
  return verticalCard;
}
