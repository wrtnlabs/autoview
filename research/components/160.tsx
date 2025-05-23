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

  // Build parent chain (e.g., "Electronics > Notebook > 15 inches")
  const parentNames: string[] = [];
  let parentNode = value.parent as AutoViewInputSubTypes.IShoppingChannelCategory.IInvert | null;
  while (parentNode) {
    parentNames.push(parentNode.name);
    parentNode = parentNode.parent as AutoViewInputSubTypes.IShoppingChannelCategory.IInvert | null;
  }
  const breadcrumb = parentNames.length > 0 ? parentNames.reverse().join(" › ") : null;

  // Count all descendants recursively
  function countDescendants(
    nodes: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[]
  ): number {
    return nodes.reduce(
      (sum, node) => sum + 1 + countDescendants(node.children),
      0
    );
  }
  const totalSubcategories = countDescendants(value.children);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <LucideReact.Tag className="text-blue-500" size={20} />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      <div className="mt-2 space-y-1 text-sm">
        <p className="text-gray-600">
          <span className="font-medium">Code:</span> {value.code}
        </p>
        <div className="flex items-center text-gray-500">
          <LucideReact.Calendar size={16} />
          <span className="ml-1">{formattedDate}</span>
        </div>
        {breadcrumb && (
          <div className="flex items-center text-gray-700">
            <span className="font-medium">Parent:</span>
            <span className="ml-1 truncate">{breadcrumb}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        {value.children.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">
                Subcategories ({totalSubcategories})
              </p>
              <LucideReact.ChevronDown
                className="text-gray-400"
                size={16}
              />
            </div>
            <ul className="mt-2 max-h-40 overflow-y-auto list-disc list-inside space-y-1 text-gray-700 text-sm">
              {value.children.map((child) => (
                <li key={child.id} className="flex justify-between">
                  <span className="truncate">{child.name}</span>
                  {child.children.length > 0 && (
                    <span className="text-gray-400 text-xs">
                      +{child.children.length}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={20} />
            <span className="ml-2">No subcategories</span>
          </div>
        )}
      </div>
    </div>
  );
}
