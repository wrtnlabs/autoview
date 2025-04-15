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



  
// Helper function to transform each category recursively into a DataListItem component.
function transformCategory(
  category: IShoppingChannelCategory.IHierarchical
): IAutoView.IAutoViewDataListItemProps {
  // Create a Markdown component to display the category name and code in a visual format.
  const markdownForLabel: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    // Using markdown formatting (bold for the name) makes the text visually appealing.
    content: `**${category.name}**\n\n_Code:_ ${category.code}`,
  };

  // Initialize the DataListItem that will represent the current category.
  const dataListItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: markdownForLabel,
  };

  // If the category has children, recursively transform them into a DataList component.
  if (category.children && category.children.length > 0) {
    const childrenItems = category.children.map((child) => transformCategory(child));
    const childrenDataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: childrenItems,
    };
    // We place the subcategories into the "value" field of the DataListItem.
    dataListItem.value = childrenDataList;
  }

  return dataListItem;
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create an Avatar component as the start element for the card header.
  // This visually represents the channel using its name.
  const channelAvatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: input.name,
    // Choose a common size; could be adjusted via configuration.
    size: 40,
    // Variant could be determined based on some logic; here we simply use "primary".
    variant: "primary",
  };

  // Create the CardHeader component to summarize the channel information.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Use the channel name as the title.
    title: input.name,
    // Use the channel code as the description.
    description: input.code,
    // The startElement is a visual cue; here an avatar is used.
    startElement: channelAvatar,
  };

  // If there are categories, construct a DataList for visualizing them.
  let dataListContent: IAutoView.IAutoViewDataListProps | undefined = undefined;
  if (input.categories && input.categories.length > 0) {
    const categoryItems = input.categories.map((category) => transformCategory(category));
    dataListContent = {
      type: "DataList",
      childrenProps: categoryItems,
    };
  }
  
  // Create the CardContent component to host the data list.
  // If no categories exist, we insert a Markdown component to indicate no data.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataListContent
      ? dataListContent
      : {
          type: "Markdown",
          content: "_No categories available for this channel._",
        },
  };

  // Compose a VerticalCard component that aggregates all channel information.
  // The VerticalCard is responsive and suited for both web and small screens.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // Children components arranged in order: header and content.
    childrenProps: [cardHeader, cardContent],
  };

  return verticalCard;
}
