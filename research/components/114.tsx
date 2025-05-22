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
  const formattedChannelDate = new Date(value.created_at).toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level: number = 0,
  ): React.ReactNode => {
    if (categories.length === 0) {
      return null;
    }
    return (
      <ul className={`${level > 0 ? 'pl-4 border-l border-gray-200' : 'mt-4'}`}>
        {categories.map((cat) => {
          const formattedCatDate = new Date(cat.created_at).toLocaleDateString('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return (
            <li key={cat.id} className="mt-2">
              <div className="flex flex-wrap items-baseline space-x-2">
                <span className="font-medium text-gray-800 truncate">{cat.name}</span>
                <span className="text-xs text-gray-500">({cat.code})</span>
                <span className="text-xs text-gray-400">· {formattedCatDate}</span>
              </div>
              {cat.children && cat.children.length > 0
                ? renderCategories(cat.children, level + 1)
                : null}
            </li>
          );
        })}
      </ul>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <div className="mt-1 flex flex-wrap items-center text-sm text-gray-600 space-x-2">
          <span>
            Code: <span className="font-medium text-gray-700">{value.code}</span>
          </span>
          <span className="text-gray-400">·</span>
          <span>Created on {formattedChannelDate}</span>
        </div>
      </header>

      {value.categories && value.categories.length > 0 ? (
        renderCategories(value.categories)
      ) : (
        <p className="mt-4 text-gray-500 text-sm">No categories available.</p>
      )}
    </div>
  );
}
