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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const buildBreadcrumb = (
    parent: AutoViewInputSubTypes.IShoppingChannelCategory.IInvert | null,
  ): string[] => {
    const names: string[] = [];
    let cursor = parent;
    while (cursor) {
      names.unshift(cursor.name);
      cursor = cursor.parent;
    }
    return names;
  };

  const ancestors = buildBreadcrumb(value.parent);
  const breadcrumb = ancestors.length > 0 ? [...ancestors, value.name].join(" > ") : value.name;

  // Recursive renderer for hierarchical children
  const renderChildren = (
    children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): JSX.Element | null => {
    if (children.length === 0) return null;
    return (
      <ul className="space-y-1">
        {children.map((child) => (
          <li key={child.id}>
            <div
              className="flex items-center text-sm text-gray-700"
              style={{ paddingLeft: level * 16 }}
            >
              <LucideReact.ChevronRight size={12} className="text-gray-400 mr-1" />
              <span className="font-medium truncate">{child.name}</span>
              <span className="ml-2 text-xs text-gray-500 truncate">({child.code})</span>
            </div>
            {renderChildren(child.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Category Title */}
      <h2 className="flex items-center text-lg font-semibold text-gray-800 truncate">
        <LucideReact.Tag size={20} className="text-blue-500 mr-2 flex-shrink-0" />
        {value.name}
      </h2>

      <div className="mt-3 space-y-2">
        {/* Code */}
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Code size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{value.code}</span>
        </div>

        {/* Breadcrumb (Parent Hierarchy) */}
        {ancestors.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <LucideReact.List size={16} className="mr-1 flex-shrink-0" />
            <span className="truncate">{breadcrumb}</span>
          </div>
        )}

        {/* Creation Date */}
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>Created on {createdDate}</span>
        </div>

        {/* Children Hierarchy */}
        {value.children.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Subcategories</h3>
            <div className="text-gray-600">{renderChildren(value.children)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
