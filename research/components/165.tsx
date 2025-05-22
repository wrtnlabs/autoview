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
  // 1. Data transformation: format creation date
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Tailwind indentation classes by depth
  const indentClasses = ["pl-0", "pl-4", "pl-8", "pl-12", "pl-16"];

  // Recursive renderer for nested categories
  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): React.ReactNode {
    return (
      <ul>
        {categories.map((cat) => {
          const indent = indentClasses[depth] || indentClasses[indentClasses.length - 1];
          return (
            <li key={cat.id} className={`${indent} mb-2`}>
              <div className="flex flex-wrap items-baseline">
                <span className="font-medium text-gray-900">{cat.name}</span>
                <span className="ml-2 text-xs text-gray-500 truncate">{cat.code}</span>
              </div>
              {cat.children && cat.children.length > 0 && renderCategories(cat.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-full">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h1>
        <p className="text-sm text-gray-600 mb-1">{value.code}</p>
        <p className="text-xs text-gray-500">Created: {formattedCreatedAt}</p>
      </div>
      {value.categories && value.categories.length > 0 ? (
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-2">Categories</h2>
          {renderCategories(value.categories)}
        </section>
      ) : (
        <p className="text-sm text-gray-500">No categories available</p>
      )}
    </div>
  );
}
