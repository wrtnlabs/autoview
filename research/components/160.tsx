import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
        children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];
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
            children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const childCount = value.children.length;
  const displayedChildren = value.children.slice(0, 3);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm w-full mx-auto">
      <header className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <time
          dateTime={value.created_at}
          className="ml-2 text-sm text-gray-500 whitespace-nowrap"
        >
          {formattedDate}
        </time>
      </header>

      <p className="mt-1 text-sm text-gray-600 truncate">
        Code: <span className="font-medium">{value.code}</span>
      </p>

      {childCount > 0 && (
        <section className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Subcategories</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {displayedChildren.map((child) => (
              <span
                key={child.id}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {child.name}
              </span>
            ))}
            {childCount > displayedChildren.length && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{childCount - displayedChildren.length} more
              </span>
            )}
          </div>
        </section>
      )}
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted.
}
