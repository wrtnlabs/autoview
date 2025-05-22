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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Recursive renderer for hierarchical categories
  const renderCategories = (
    items: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0
  ): React.ReactNode => (
    <ul className="space-y-2">
      {items.map((item) => {
        const subCount = item.children?.length ?? 0;
        return (
          <li key={item.id}>
            <div
              style={{ paddingLeft: `${level * 1}rem` }}
              className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center flex-wrap">
                <span className="text-gray-900 font-medium">{item.name}</span>
                <span className="text-sm text-gray-500 ml-2">({item.code})</span>
                {subCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                    {subCount} {subCount === 1 ? "subcategory" : "subcategories"}
                  </span>
                )}
              </div>
              <div className="mt-2 md:mt-0 text-sm text-gray-500">
                Created {formatDate(item.created_at)}
              </div>
            </div>
            {subCount > 0 && renderCategories(item.children, level + 1)}
          </li>
        );
      })}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {value && value.length > 0 ? (
        renderCategories(value)
      ) : (
        <div className="text-center text-gray-500 py-10">
          No categories available.
        </div>
      )}
    </div>
  );
}
