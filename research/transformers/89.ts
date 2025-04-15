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



  
// A helper function to recursively transform a category into a DataListItem component.
// This function uses a Markdown component for the label and either a nested DataList (if children exist)
// or a Markdown component for details as the value.
function createCategoryItem(category: IShoppingChannelCategory.IHierarchical): IAutoView.IAutoViewDataListItemProps {
  // If the category has children, recursively map them to DataList items.
  let valueComponent: IAutoView.IAutoViewComponentProps;
  if (category.children && category.children.length > 0) {
    valueComponent = {
      type: "DataList",
      childrenProps: category.children.map(createCategoryItem)
    };
  } else {
    // Otherwise, display details using a Markdown component.
    valueComponent = {
      type: "Markdown",
      content: `**Code:** ${category.code}\n\n**Created at:** ${category.created_at}`
    };
  }
  return {
    type: "DataListItem",
    label: {
      type: "Markdown",
      content: `**Category:** ${category.name}`
    },
    value: valueComponent
  };
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a CardHeader to display channel's primary information.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Channel Code: ${input.code}`,
    // Using an icon to add visual appeal.
    startElement: {
      type: "Icon",
      id: "store", // assuming "store" is a valid icon name (in kebab-case without prefix)
      color: "blue",
      size: 32
    }
  };

  // Build the content that shows additional channel details.
  // We use Markdown to display the creation date and a visually engaging title.
  const channelDetails: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `**Created at:** ${input.created_at}`
  };

  // Process the categories. If no categories exist then show a simple text message.
  let categoriesComponent: IAutoView.IAutoViewComponentProps;
  if (input.categories && input.categories.length > 0) {
    categoriesComponent = {
      type: "DataList",
      childrenProps: input.categories.map(createCategoryItem)
    };
  } else {
    categoriesComponent = {
      type: "Markdown",
      content: "No categories available."
    };
  }

  // Compose the CardContent with both channel details and the categories list.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [channelDetails, categoriesComponent]
  };

  // Finally, wrap everything in a VerticalCard for a consistent and responsive layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return verticalCard;
}

