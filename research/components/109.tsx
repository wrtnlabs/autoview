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
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const childrenCount = value.children.length;

  // Recursive function to render hierarchical children
  const renderChildren = (
    nodes: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode => {
    if (!nodes || nodes.length === 0) return null;
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id} className="mb-2">
            <div
              className="flex justify-between items-center"
              style={{ marginLeft: level * 16 }}
            >
              <span className="text-gray-800 truncate">{node.name}</span>
              <span className="text-xs text-gray-500">
                {node.children.length}{' '}
                {node.children.length === 1 ? 'Subcategory' : 'Subcategories'}
              </span>
            </div>
            {renderChildren(node.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow min-w-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <span className="mt-2 sm:mt-0 text-sm text-gray-500">{formattedDate}</span>
      </div>

      <div className="flex flex-wrap items-center space-x-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          {value.code}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
          {childrenCount} {childrenCount === 1 ? 'Subcategory' : 'Subcategories'}
        </span>
      </div>

      {childrenCount > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Subcategories</h3>
          {renderChildren(value.children)}
        </div>
      )}
    </div>
  );
}
