import LucideReact from "lucide-react";
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
  const { name, code, created_at: createdAt, categories } = value;
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Recursively count all categories including nested ones
  function countCategories(
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return cats.reduce(
      (sum, cat) => sum + 1 + countCategories(cat.children),
      0,
    );
  }
  const totalCategories = countCategories(categories);

  // Recursive renderer for nested categories
  function renderCategory(
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
  ): JSX.Element {
    return (
      <li key={cat.id} className="mt-2">
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-blue-500" />
          <span className="font-medium text-gray-800">{cat.name}</span>
          <span className="text-sm text-gray-500">({cat.code})</span>
        </div>
        {cat.children.length > 0 && (
          <ul className="list-none pl-4">
            {cat.children.map((child) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with channel info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LucideReact.Tag size={14} />
            <span>{code}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 sm:mt-0">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.List size={16} />
            <span>{totalCategories} categories</span>
          </div>
        </div>
      </div>

      {/* Category tree or empty state */}
      {categories.length > 0 ? (
        <ul className="list-none space-y-2">
          {categories.map((cat) => renderCategory(cat))}
        </ul>
      ) : (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No categories available</span>
        </div>
      )}
    </div>
  );
}
