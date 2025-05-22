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
  //    Format the channel creation date for display.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // 2. Recursive renderer for category hierarchy.
  const renderCategory = (
    category: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    level: number,
  ): React.ReactNode => {
    const hasChildren = category.children.length > 0;
    return (
      <li key={category.id}>
        <div className={`flex items-center ${level > 0 ? 'ml-4' : ''}`}>
          <span className="font-medium text-gray-800 truncate">{category.name}</span>
          <span className="ml-2 text-xs text-gray-500">({category.code})</span>
          {hasChildren && (
            <span className="ml-2 flex-shrink-0 text-gray-400 text-xs">
              {category.children.length} sub-categories
            </span>
          )}
        </div>
        {hasChildren && (
          <ul className="mt-1 border-l border-gray-200 pl-4 space-y-1">
            {category.children.map(child => renderCategory(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-full">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      <div className="mt-1 text-sm text-gray-500 flex flex-wrap space-x-4">
        <span>
          Code:
          <span className="ml-1 font-medium text-gray-700">{value.code}</span>
        </span>
        <span>
          Created:
          <time dateTime={value.created_at} className="ml-1 font-medium text-gray-700">
            {formattedDate}
          </time>
        </span>
      </div>
      {value.categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Categories</h3>
          <ul className="space-y-2">
            {value.categories.map(cat => renderCategory(cat, 0))}
          </ul>
        </div>
      )}
    </div>
  );
}
