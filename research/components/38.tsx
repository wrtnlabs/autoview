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
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  // Recursively collect ancestor names from the invert parent structure
  function getAncestors(
    node: AutoViewInputSubTypes.IShoppingChannelCategory["parent"],
  ): string[] {
    if (!node) return [];
    return [...getAncestors(node.parent), node.name];
  }
  const ancestors = getAncestors(value.parent);

  // Prepare children preview (show up to 3 subcategories)
  const previewCount = 3;
  const childrenCount = value.children.length;
  const childrenPreview = value.children.slice(0, previewCount);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
      {/* Category Title and Code */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Tag size={16} className="mr-1" />
          <span className="truncate">{value.code}</span>
        </div>
      </div>

      {/* Metadata: Creation Date and Ancestor Path */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
        {ancestors.length > 0 && (
          <div className="mt-1 sm:mt-0 flex items-center">
            <LucideReact.Folder size={16} className="mr-1" />
            <span className="truncate">{ancestors.join(" / ")}</span>
          </div>
        )}
      </div>

      {/* Subcategories Preview */}
      {childrenCount > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">
            Subcategories ({childrenCount})
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {childrenPreview.map((child) => (
              <span
                key={child.id}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs truncate"
                title={child.name}
              >
                {child.name}
              </span>
            ))}
            {childrenCount > previewCount && (
              <span className="text-xs text-gray-500 px-2">
                +{childrenCount - previewCount} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
