import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IShoppingChannel {
    /**
     * Hierarchical channel information with children categories.
     */
    export type IHierarchical = {
      /**
       * Children categories with hierarchical structure.
       *
       * @title Children categories with hierarchical structure
       */
      categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];
      /**
       * Primary Key.
       *
       * @title Primary Key
       */
      id: string;
      /**
       * Creation time of record.
       *
       * @title Creation time of record
       */
      created_at: string;
      /**
       * Identifier code.
       *
       * @title Identifier code
       */
      code: string;
      /**
       * Name of the channel.
       *
       * @title Name of the channel
       */
      name: string;
    };
  }
  export namespace IShoppingChannelCategory {
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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingChannel.IHierarchical;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  function countCategories(
    list: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return list.reduce(
      (sum, cat) => sum + 1 + countCategories(cat.children),
      0,
    );
  }
  const totalCategories = countCategories(value.categories);

  // Recursive renderer for nested categories
  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): JSX.Element {
    return (
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <div className="flex items-center text-gray-700">
              <LucideReact.Tag
                size={16}
                className="text-blue-500 flex-shrink-0"
              />
              <span className="ml-2 font-medium truncate">{cat.name}</span>
              <span className="ml-2 text-xs text-gray-400">({cat.code})</span>
            </div>
            {cat.children.length > 0 && (
              <div className="ml-6 mt-1 border-l border-gray-200 pl-4">
                {renderCategories(cat.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Channel Icon and Name/Code */}
      <div className="flex items-center">
        <LucideReact.ShoppingBag
          size={24}
          className="text-indigo-500 flex-shrink-0"
        />
        <div className="ml-3 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <div className="mt-0.5 flex items-center text-sm text-gray-500">
            <LucideReact.Hash size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{value.code}</span>
          </div>
        </div>
      </div>

      {/* Created Date */}
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1 flex-shrink-0" />
        <span>Created on {formattedCreatedAt}</span>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Total Categories:
        <span className="ml-1 font-medium text-gray-800">
          {totalCategories}
        </span>
      </div>

      {/* Category Tree */}
      <div className="mt-4">
        {value.categories.length > 0 ? (
          renderCategories(value.categories)
        ) : (
          <div className="flex flex-col items-center py-6 text-gray-400">
            <LucideReact.AlertCircle size={24} className="mb-2" />
            <span>No categories available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
