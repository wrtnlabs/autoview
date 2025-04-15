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
  // The goal of this transformation is to visually represent a shopping channel category,
  // using card components enriched with icons and markdown for an engaging UI.
  // We use a Vertical Card that includes a header and a content section.
  
  // 1. Create a Card Header to immediately show the category name and a visual icon.
  //    The "startElement" is set with an icon representing a category (using "tag" as an example).
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    // Use the category code and creation date as a brief description.
    description: `Code: ${input.code} | Created At: ${input.created_at}`,
    startElement: {
      type: "Icon",
      id: "tag",       // using "tag" icon to represent a category
      color: "blue",
      size: 24
    }
  };

  // 2. Prepare the content to display any children categories in a list format.
  //    If there are children, we create a data list; otherwise, display an informative markdown.
  let contentComponent: IAutoView.IAutoViewPresentationComponentProps;
  
  if (input.children && input.children.length > 0) {
    // Map each child category into a DataListItem component.
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.children.map(child => {
      // For each child we use a markdown component as label to improve readability,
      // showing the child's name in bold along with its code and creation date.
      return {
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: `**${child.name}**  
Code: ${child.code}  
Created At: ${child.created_at}`
        }
      };
    });
    
    // Compose the DataList using these list items.
    contentComponent = {
      type: "DataList",
      childrenProps: listItems
    };
  } else {
    // If there are no child categories, use a Markdown component to display a message.
    contentComponent = {
      type: "Markdown",
      content: "No sub-categories available."
    };
  }
  
  // 3. Wrap the contentComponent inside a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent
  };

  // 4. Compose the final Vertical Card.
  //    VerticalCard.childrenProps accepts CardHeader, CardContent, CardMedia, or CardFooter components.
  return {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };
}
