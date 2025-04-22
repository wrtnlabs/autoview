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
   * Recursively builds a DataList representation of a category node.
   * - Lists the basic properties (name, code, creation time).
   * - If children exist, nests another DataList under a "Children" item.
   */
  function buildDataList(
    category: Schema.IShoppingChannelCategory.IHierarchical
  ): IAutoView.IAutoViewDataListProps {
    // Prepare the basic fields as DataListItem entries
    const items: IAutoView.IAutoViewDataListItemProps[] = [
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Name" }],
        value: [{ type: "Text", content: category.name }],
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Code" }],
        // Use a Chip for the category code to make it stand out
        value: [
          {
            type: "Chip",
            label: category.code,
            variant: "outlined",
          },
        ],
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Created At" }],
        // Render timestamp as markdown for consistent styling on small screens
        value: [
          {
            type: "Markdown",
            content: `\`${category.created_at}\``,
          },
        ],
      },
    ];

    // If this category has children, append a nested DataList under "Children"
    if (category.children && category.children.length > 0) {
      items.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Children" }],
        value: category.children.map((child) => buildDataList(child)),
      });
    }

    return {
      type: "DataList",
      childrenProps: items,
    };
  }

  // The root input may include a "parent" pointer; we visualize the tree starting
  // from the input node itself, ignoring the parent link to avoid cycles.
  return buildDataList(input as Schema.IShoppingChannelCategory.IHierarchical);
}
