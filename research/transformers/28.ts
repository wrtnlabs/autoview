import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Category of channel.
 *
 * `IShoppingChannelCategory` is a concept that refers to classification
 * categories within a specific {@link IShoppingChannel channel}, and is exactly
 * the same as the concept commonly referred to as "category" in shopping malls.
 *
 * And `IShoppingChannelCategory` is different with {@link IShoppingSection}.
 * {@link IShoppingSection} refers to a "corner" that is independent spatial
 * information in the offline market, which cannot simultaneously classified in
 * a {@link IShoppingSale sale}. Besides, `IShoppingChannelCategory` can be
 * classified into multiple categories in a sale simultaneously.
 *
 * Product	| Section (corner) | Categories
 * ---------|------------------|-----------------------------------
 * Beef	    | Butcher corner   | Frozen food, Meat, Favorite food
 * Grape    | Fruit corner     | Fresh food, Favorite food
 *
 * In addition, as `IShoppingChannelCategory` has 1:N self recursive relationship,
 * it is possible to express below hierarchical structures. Thus, each channel
 * can set their own category classification as they want.
 *
 * - Food > Meat > Frozen
 * - Electronics > Notebook > 15 inches
 * - Miscellaneous > Wallet
 *
 * Furthermore, `IShoppingChannelCategory` is designed to merge between themselves,
 * so there is no burden to edit the category at any time.
*/
type IShoppingChannelCategory = {
    /**
     * Parent category info.
     *
     * @title Parent category info
    */
    parent: null | any;
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
namespace IShoppingChannelCategory {
    export type IInvert = any;
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
type IAutoViewTransformerInputType = IShoppingChannelCategory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We use a vertical card to display the category details.
  // The card header will show the main category name and a representative icon.
  // The card content will show additional details in markdown format,
  // and, if any, a data list of the immediate children categories.

  // Build the card header with an icon representing a category.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Code: ${input.code}`,
    // Use an icon as the start element for a more visual UI.
    // "category" is a generic icon meant to represent a category.
    startElement: {
      type: "Icon",
      id: "category", // the icon id in kebab-case; adjust if necessary to match available icons
      color: "blue",
      size: 16,
    },
  };

  // Build a markdown component to show details about the category.
  // Markdown is used here to avoid plain text rendering.
  const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `**ID**: ${input.id}\n\n**Parent ID**: ${input.parent_id ? input.parent_id : "None"}\n\n**Created At**: ${input.created_at}`,
  };

  // If there are any child categories, build a data list component.
  let childrenDataList: IAutoView.IAutoViewDataListProps | null = null;
  if (input.children && input.children.length > 0) {
    // Map each child into a DataListItem with a visual start element.
    const childrenItems: IAutoView.IAutoViewDataListItemProps[] = input.children.map((child) => {
      return {
        type: "DataListItem",
        // Display the child's name as the title.
        title: child.name,
        // Use the child's code as a brief description.
        description: `Code: ${child.code}`,
        // Add an icon to indicate this is a nested sub-category.
        startElement: {
          type: "Icon",
          id: "subdirectory-arrow-right", // generic icon id to show child relation
          color: "gray",
          size: 12,
        },
      };
    });
    childrenDataList = {
      type: "DataList",
      childrenProps: childrenItems,
    };
  }

  // Compose the main card content.
  // We embed both the details markdown and, if available, the children list within the card content.
  // Since CardContent's childrenProps accepts any presentation component,
  // we can include both IAutoViewMarkdownProps and IAutoViewDataListProps.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: childrenDataList ? [detailsMarkdown, childrenDataList] : detailsMarkdown,
  };

  // Finally, assemble the vertical card.
  // VerticalCard accepts children such as CardHeader and CardContent.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed UI component props.
  return verticalCard;
}
