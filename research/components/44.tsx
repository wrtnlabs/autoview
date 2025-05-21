import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannel.IHierarchical;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Compute total number of categories recursively.
  function countCategories(
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return cats.reduce(
      (sum, cat) => sum + 1 + countCategories(cat.children),
      0,
    );
  }
  const totalCategories = countCategories(value.categories);
  //    Format creation date
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  //    Recursive renderer for category tree
  function renderCategory(
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    level = 0,
  ): React.ReactNode {
    return (
      <li key={cat.id} style={{ marginLeft: level * 16 }} className="mb-2">
        <div className="flex items-baseline space-x-2">
          <span className="font-medium text-gray-800 line-clamp-1">
            {cat.name}
          </span>
          <span className="text-xs text-gray-500">({cat.code})</span>
        </div>
        {cat.children && cat.children.length > 0 && (
          <ul className="mt-1">
            {cat.children.map((child) => renderCategory(child, level + 1))}
          </ul>
        )}
      </li>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
          <span>Code: {value.code}</span>
          <span>Created: {formattedDate}</span>
          <span>Total Categories: {totalCategories}</span>
        </div>
      </header>
      {value.categories.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Categories
          </h3>
          <ul className="list-disc list-inside">
            {value.categories.map((cat) => renderCategory(cat, 0))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No categories available.</p>
      )}
    </section>
  );
}
