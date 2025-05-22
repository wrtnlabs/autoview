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
  //    Derive ancestor category names for breadcrumb
  const ancestorNames: string[] = [];
  let parent = value.parent;
  while (parent) {
    ancestorNames.push(parent.name);
    parent = parent.parent;
  }
  const reversedAncestors = [...ancestorNames].reverse();

  //    Format creation date
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  //    Recursive renderer for children hierarchy
  const renderChildren = (
    children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): React.ReactNode => (
    <ul className="mt-1 pl-4 space-y-1">
      {children.map((child) => (
        <li key={child.id} className="flex flex-col">
          <div className="flex items-center gap-2">
            <LucideReact.Tag className="text-blue-500" size={16} />
            <span className="text-gray-800">{child.name}</span>
          </div>
          {child.children &&
            child.children.length > 0 &&
            renderChildren(child.children)}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      {/* Title */}
      <div className="flex items-center mb-2">
        <LucideReact.Tag className="text-indigo-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-900">
          {value.name}
        </h2>
      </div>

      {/* Code and Created Date */}
      <div className="flex flex-wrap text-sm text-gray-500 mb-2 gap-x-4">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-mono text-gray-800">{value.code}</span>
        </div>
      </div>

      {/* Breadcrumb */}
      {reversedAncestors.length > 0 && (
        <div className="text-sm text-gray-600 mb-2 flex items-center flex-wrap">
          {reversedAncestors.map((name, idx) => (
            <span key={idx} className="flex items-center">
              <span>{name}</span>
              <LucideReact.ChevronRight
                className="text-gray-400 mx-1"
                size={12}
              />
            </span>
          ))}
          <span className="font-semibold">{value.name}</span>
        </div>
      )}

      {/* Children Hierarchy */}
      <div>
        {value.children && value.children.length > 0 ? (
          <>
            <h3 className="text-sm font-medium text-gray-700">
              Subcategories ({value.children.length})
            </h3>
            {renderChildren(value.children)}
          </>
        ) : (
          <div className="text-sm text-gray-500">No subcategories</div>
        )}
      </div>
    </div>
  );
}
