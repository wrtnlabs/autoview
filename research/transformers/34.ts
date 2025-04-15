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



// Helper function to recursively transform a list of categories into a DataList component
function transformDataList(categories: IShoppingChannelCategory.IHierarchical[]): IAutoView.IAutoViewDataListProps {
  return {
    type: "DataList",
    // Map each category to a DataListItem using the recursive transformer
    childrenProps: categories.map(transformCategory)
  };
}

// Recursive helper function to transform a single category into a DataListItem component
function transformCategory(category: IShoppingChannelCategory.IHierarchical): IAutoView.IAutoViewDataListItemProps {
  // Use a Markdown component for the label to enhance visual presentation
  const listItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      // Markdown content with bold formatting for the category name
      content: `**${category.name}**`,
      type: "Markdown"
    }
  };

  // If the category has subcategories, recursively create a DataList in the "value" field
  if (category.children && category.children.length > 0) {
    listItem.value = transformDataList(category.children);
  }
  
  return listItem;
}

// Main function to transform hierarchical shopping channel input data into an AutoView UI component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a CardHeader to display key channel information visually.
  // The startElement is an icon (e.g., "store") to give a visual cue for the channel.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name, // Channel name provided in the input
    description: `Code: ${input.code}\nCreated: ${new Date(input.created_at).toLocaleDateString()}`,
    startElement: {
      id: "store", // Use a store icon to represent a shopping channel
      type: "Icon",
      color: "blue",
      size: 24
    }
  };

  // Transform the hierarchical categories into a visual DataList component.
  // This recursively shows subcategories with Markdown labels.
  const categoriesDataList: IAutoView.IAutoViewDataListProps = transformDataList(input.categories);

  // Create a CardContent to hold the DataList.
  // This approach uses a mix of visual components to reduce reliance on plain text.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: categoriesDataList
  };

  // Assemble the final VerticalCard that contains both the header and content.
  // The VerticalCard ensures the UI is responsive and friendly for mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return verticalCard;
}
