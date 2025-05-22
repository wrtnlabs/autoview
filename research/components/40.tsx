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
  const ancestorNames: string[] = (() => {
    const names: string[] = [];
    let current: AutoViewInputSubTypes.IShoppingChannelCategory.IInvert | null =
      value.parent;
    while (current) {
      names.push(current.name);
      current = current.parent;
    }
    return names.reverse();
  })();

  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const childrenCount = value.children.length;
  const maxDisplay = 5;
  const displayedChildren = value.children.slice(0, maxDisplay);
  const extraCount = childrenCount - displayedChildren.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {ancestorNames.length > 0 && (
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
          {ancestorNames.map((name, idx) => (
            <React.Fragment key={idx}>
              <span className="truncate">{name}</span>
              {idx < ancestorNames.length - 1 && (
                <LucideReact.ChevronRight
                  className="mx-1 text-gray-400"
                  size={12}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>
      <div className="text-sm text-gray-500 truncate">Code: {value.code}</div>

      <div className="flex items-center text-sm text-gray-500 mt-2">
        <LucideReact.Calendar className="text-gray-400" size={16} />
        <span className="ml-1">{formattedDate}</span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-1">
        <LucideReact.Folder className="text-gray-400" size={16} />
        <span className="ml-1">Subcategories: {childrenCount}</span>
      </div>

      {childrenCount > 0 && (
        <div className="mt-3">
          <ul className="space-y-1">
            {displayedChildren.map((child) => (
              <li
                key={child.id}
                className="flex items-center justify-between text-sm text-gray-700"
              >
                <span className="truncate">{child.name}</span>
                {child.children.length > 0 && (
                  <span className="text-gray-400 text-xs">
                    {child.children.length} sub
                  </span>
                )}
              </li>
            ))}
            {extraCount > 0 && (
              <li className="text-sm text-gray-500">+{extraCount} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
