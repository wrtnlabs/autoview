import LucideReact from "lucide-react";
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
  type Category = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical;

  // Recursively count total descendants of a category
  const getTotalDescendants = (cat: Category): number => {
    if (!cat.children || cat.children.length === 0) return 0;
    return cat.children.reduce(
      (sum, child) => sum + 1 + getTotalDescendants(child),
      0,
    );
  };

  // Format ISO date to a readable string
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  // Recursively render a category and its children
  const renderCategory = (
    cat: Category,
    level: number = 0,
  ): React.ReactNode => {
    const descendants = getTotalDescendants(cat);
    return (
      <div key={cat.id} className="w-full">
        <div
          className={`flex flex-wrap items-center justify-between py-2 ${
            level > 0 ? `pl-${Math.min(level * 4, 12)}` : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            <LucideReact.Tag className="text-blue-500" size={16} aria-hidden />
            <span className="font-medium text-gray-800 truncate">
              {cat.name}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs px-1 rounded truncate">
              {cat.code}
            </span>
            {descendants > 0 && (
              <span className="text-gray-500 text-xs italic truncate">
                ({descendants} sub)
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <LucideReact.Calendar size={14} aria-hidden />
            <span>{formatDate(cat.created_at)}</span>
          </div>
        </div>
        {cat.children && cat.children.length > 0 && (
          <div>
            {cat.children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span className="text-sm">No categories available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-auto">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Tag size={20} className="text-blue-500 mr-2" />
        Categories
      </h2>
      <div className="divide-y divide-gray-100">
        {value.map((root) => renderCategory(root, 0))}
      </div>
    </div>
  );
}
