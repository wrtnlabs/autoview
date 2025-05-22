import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    parent: null | AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;
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
    /**
     * Invert category information with parent category.
     */
    export type IInvert = {
      /**
       * Parent category info with recursive structure.
       *
       * If no parent exists, then be `null`.
       *
       * @title Parent category info with recursive structure
       */
      parent: null | AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;
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
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  // Recursive renderer for hierarchical subcategories
  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 1,
  ): React.ReactNode {
    return (
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            style={{ paddingLeft: depth * 16 }}
            className="bg-gray-50 rounded-lg p-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-medium">{cat.name}</span>
              <span className="text-sm text-gray-500">Code: {cat.code}</span>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <LucideReact.Calendar size={14} className="mr-1" />
              {new Date(cat.created_at).toLocaleDateString()}
            </div>
            {cat.children.length > 0 &&
              renderCategories(cat.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Code: {value.code}</p>
        </div>
        <div className="ml-4 flex flex-col items-end space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            {formattedCreatedAt}
          </div>
          <div className="flex items-center">
            <LucideReact.Folder size={16} className="mr-1" />
            {value.children.length} subcategories
          </div>
        </div>
      </div>

      {value.children.length > 0 ? (
        <div className="mt-4">{renderCategories(value.children)}</div>
      ) : (
        <div className="mt-4 flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          No subcategories
        </div>
      )}
    </div>
  );
}
