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
  const { name, code, created_at, children } = value;
  const formattedCreatedDate = new Date(created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Recursive renderer for hierarchical children
  function renderChildren(
    list: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): React.ReactNode {
    if (!list.length) return null;
    return (
      <ul className={`${depth > 0 ? 'pl-4' : ''} list-disc`}>
        {list.map((child) => {
          const childDate = new Date(child.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return (
            <li key={child.id} className="mb-2">
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium truncate">{child.name}</span>
                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-3">
                  <span>
                    Code: <span className="text-gray-700">{child.code}</span>
                  </span>
                  <span>Created: {childDate}</span>
                </div>
              </div>
              {renderChildren(child.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{name}</h2>
      <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div>
          Code: <span className="text-gray-700">{code}</span>
        </div>
        <div>Created: {formattedCreatedDate}</div>
      </div>
      {children.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Subcategories ({children.length})</h3>
          {renderChildren(children)}
        </div>
      )}
    </div>
  );
}
