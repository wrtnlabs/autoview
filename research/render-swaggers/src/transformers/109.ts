import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
    export type IShoppingChannelCategory = {
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
        children: Schema.IShoppingChannelCategory.IHierarchical[];
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
    export namespace IShoppingChannelCategory {
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
            children: Schema.IShoppingChannelCategory.IHierarchical[];
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
}
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Recursively convert a list of hierarchical categories into DataListItemProps.
   * For each category:
   *  - Label shows a folder icon, the category name, and a chip with its code.
   *  - Value shows either its child categories (as a nested DataList) or a creation date text.
   */
  function buildDataListItems(
    categories: Schema.IShoppingChannelCategory.IHierarchical[],
  ): IAutoView.IAutoViewDataListItemProps[] {
    return categories.map((cat) => {
      // Compose the label: an icon, the category name, and a small chip for the code.
      const label: IAutoView.IAutoViewPresentationComponentProps[] = [
        {
          // Folder icon to represent a category
          type: "Icon",
          id: "folder",
          size: 16,
          color: "blue",
        },
        {
          // Category name
          type: "Text",
          content: cat.name,
          variant: "body1",
        },
        {
          // Code as an outlined chip
          type: "Chip",
          label: cat.code,
          variant: "outlined",
          size: "small",
          color: "info",
        },
      ];

      // If the category has children, build a nested DataList for them.
      if (Array.isArray(cat.children) && cat.children.length > 0) {
        const nestedList: IAutoView.IAutoViewDataListProps = {
          type: "DataList",
          // Recursively build items for children
          childrenProps: buildDataListItems(cat.children),
        };

        return {
          type: "DataListItem",
          label,
          // Show the nested list as the value area
          value: nestedList,
        };
      } else {
        // Leaf node: show the creation date as a caption
        const createdText: IAutoView.IAutoViewTextProps = {
          type: "Text",
          content: `Created at ${new Date(cat.created_at).toLocaleDateString()}`,
          variant: "caption",
          color: "gray",
        };

        return {
          type: "DataListItem",
          label,
          // Value can be an array of Presentation components
          value: [createdText],
        };
      }
    });
  }

  // Top-level DataList showing all root categories
  const rootList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: buildDataListItems(input.children),
  };

  return rootList;
}
