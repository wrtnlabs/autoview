import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingChannelCategory {
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
    }
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export interface IInvert {
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
        }
        /**
         * Hierarchical category information with children categories.
        */
        export interface IHierarchical {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Build breadcrumb of parent categories
  const ancestors: string[] = [];
  let curr = value.parent;
  while (curr) {
    ancestors.push(curr.name);
    curr = curr.parent;
  }
  ancestors.reverse();

  // Count all descendant subcategories recursively
  function countDesc(
    children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return children.reduce((sum, child) => sum + 1 + countDesc(child.children), 0);
  }
  const descendantCount = countDesc(value.children);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Category name and code */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <span className="text-sm text-gray-500">{value.code}</span>
      </div>

      {/* Created date */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>Created: {formattedDate}</span>
      </div>

      {/* Breadcrumb of ancestors */}
      {ancestors.length > 0 && (
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <LucideReact.FolderTree className="mr-1" size={16} />
          <nav className="flex items-center flex-wrap gap-1">
            {ancestors.map((name, idx) => (
              <span key={idx} className="truncate">
                {name}
                <span className="mx-1">›</span>
              </span>
            ))}
            <span className="font-medium text-gray-700 truncate">{value.name}</span>
          </nav>
        </div>
      )}

      {/* Descendant count */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <LucideReact.List className="mr-1" size={16} />
        <span>{descendantCount} subcategories</span>
      </div>

      {/* Immediate children as tags */}
      {value.children.length > 0 && (
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Subcategories</h3>
          <div className="flex flex-wrap gap-2">
            {value.children.map((child) => (
              <span
                key={child.id}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                <LucideReact.Tag size={12} className="text-gray-500" />
                <span className="truncate">{child.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
