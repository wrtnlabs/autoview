import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Define a local alias for readability
  type Category = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical;

  // Formatter for ISO date strings into "MMM D, YYYY"
  const dateFormatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Predefined indent classes for nested levels
  const indentClasses = ['pl-0', 'pl-4', 'pl-8', 'pl-12', 'pl-16'];

  // Recursive renderer for the category tree
  function renderCategories(items: Category[], level: number = 0): React.ReactNode {
    if (!items || items.length === 0) return null;

    return (
      <ul role="group" className="space-y-2">
        {items.map((cat) => {
          const formattedDate = dateFormatter.format(new Date(cat.created_at));
          const indent = indentClasses[level] ?? indentClasses[indentClasses.length - 1];

          return (
            <li
              key={cat.id}
              role="treeitem"
              aria-level={level + 1}
              className={`${indent} mb-2`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-800 truncate">
                  {cat.name}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  ({cat.code})
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  Created: {formattedDate}
                </span>
              </div>
              {cat.children && cat.children.length > 0 && (
                <div className="mt-1">{renderCategories(cat.children, level + 1)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  // Main render
  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-xl mx-auto">
      {value && value.length > 0 ? (
        renderCategories(value)
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
}
