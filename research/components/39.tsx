import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
  AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Recursive renderer for hierarchical categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level: number = 0,
  ): JSX.Element => (
    <ul
      className={`${level > 0 ? "pl-4 border-l border-gray-200" : ""} space-y-2`}
    >
      {categories.map((cat) => (
        <li key={cat.id}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <LucideReact.Tag size={16} className="text-blue-500" />
              <span className="font-medium text-gray-800 truncate">
                {cat.name}
              </span>
              <span className="ml-auto text-sm text-gray-500 truncate">
                {cat.code}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-0.5">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>{formatDate(cat.created_at)}</span>
            </div>
          </div>
          {cat.children &&
            cat.children.length > 0 &&
            renderCategories(cat.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full overflow-x-auto">
      {value && value.length > 0 ? (
        renderCategories(value)
      ) : (
        <div className="flex items-center justify-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No categories available</span>
        </div>
      )}
    </div>
  );
}
