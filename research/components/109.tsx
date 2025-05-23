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
  //    Build the parent category path.
  const parentNames: string[] = [];
  let currentParent = value.parent;
  while (currentParent) {
    parentNames.unshift(currentParent.name);
    currentParent = currentParent.parent;
  }
  // Derive display text for category path.
  const categoryPath =
    parentNames.length > 0
      ? `${parentNames.join(" / ")} / ${value.name}`
      : value.name;

  // Summarize child categories (show up to 3 names, then "+n more").
  const childCount = value.children.length;
  const childNames = value.children.map((child) => child.name);
  const displayedChildNames = childNames.slice(0, 3);
  const childrenSummary =
    childCount > 0
      ? displayedChildNames.join(", ") +
        (childCount > 3 ? `, +${childCount - 3} more` : "")
      : "";

  // Format the creation date for readability.
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md">
      {/* Category Name */}
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <LucideReact.Tag className="text-blue-500" size={20} />
        <span className="truncate">{value.name}</span>
      </h2>

      {/* Creation Date */}
      <p className="mt-1 text-sm text-gray-500 flex items-center">
        <LucideReact.Calendar size={16} className="mr-1" />
        Created: {formattedDate}
      </p>

      {/* Parent Path (if exists) */}
      {parentNames.length > 0 && (
        <p className="mt-1 text-sm text-gray-500 flex items-center">
          <LucideReact.ArrowUp size={16} className="mr-1" />
          <span className="truncate">Parent: {parentNames.join(" / ")}</span>
        </p>
      )}

      {/* Subcategory Summary */}
      <p className="mt-3 text-sm text-gray-700 flex items-start gap-2">
        <LucideReact.ChevronsDown
          size={16}
          className="mt-[2px] text-gray-500"
        />
        {childCount > 0 ? (
          <span className="truncate">Subcategories: {childrenSummary}</span>
        ) : (
          <span className="text-gray-400">No subcategories</span>
        )}
      </p>
    </div>
  );
}
