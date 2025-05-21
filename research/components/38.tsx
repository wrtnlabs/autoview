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
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Recursive renderer for hierarchical subcategories
  function renderChildren(
    children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level: number = 0,
  ): React.ReactNode {
    return (
      <ul className={`${level === 0 ? "mt-2" : "mt-1"}`}>
        {children.map((child) => {
          const childDate = new Date(child.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return (
            <li
              key={child.id}
              className={`border-l-2 border-gray-200 pl-4 py-2 ${
                level > 0 ? "ml-2" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 truncate">
                  {child.name}
                </span>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {childDate}
                </span>
              </div>
              {child.children && child.children.length > 0 && renderChildren(child.children, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span className="mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {value.code}
        </span>
      </div>
      <div className="mt-1 text-sm text-gray-500">
        Created on {formattedDate}
      </div>

      {value.children && value.children.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">
            Subcategories ({value.children.length})
          </h3>
          {renderChildren(value.children)}
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-500">No subcategories</div>
      )}
    </div>
  );
}
