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
  const channelName = value.name;
  const channelCode = value.code;
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  function countCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return categories.reduce(
      (sum, cat) => sum + 1 + countCategories(cat.children),
      0,
    );
  }
  const totalCategories = countCategories(value.categories);

  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode {
    return (
      <ul className="mt-1 space-y-1">
        {categories.map((cat) => (
          <li key={cat.id}>
            <div
              className="flex items-center gap-1"
              style={{ marginLeft: `${level}rem` }}
            >
              <LucideReact.Tag size={16} className="text-blue-500" />
              <span className="text-gray-800 font-medium">{cat.name}</span>
              <span className="text-sm text-gray-500">({cat.code})</span>
            </div>
            {cat.children.length > 0 &&
              renderCategories(cat.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-md mx-auto">
      <header className="flex items-center gap-2">
        <LucideReact.ShoppingCart size={24} className="text-indigo-500" />
        <h2 className="text-xl font-semibold text-gray-900">{channelName}</h2>
        <span className="text-sm text-gray-500 ml-auto">{channelCode}</span>
      </header>

      <div className="mt-2 flex items-center text-sm text-gray-500 gap-2">
        <LucideReact.Calendar size={16} />
        <time dateTime={value.created_at}>{formattedCreatedAt}</time>
        <LucideReact.List size={16} />
        <span>{totalCategories} categories</span>
      </div>

      <section className="mt-4">
        {value.categories.length > 0 ? (
          renderCategories(value.categories)
        ) : (
          <div className="py-6 grid place-items-center text-gray-400">
            <LucideReact.AlertCircle size={48} />
            <p className="mt-2 text-sm">No categories available</p>
          </div>
        )}
      </section>
    </div>
  );
}
