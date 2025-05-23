import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export interface IHierarchical {
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
        }
    }
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export interface IHierarchical {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannel.IHierarchical;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and aggregated values
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    cats.reduce((sum, cat) => sum + 1 + countCategories(cat.children), 0);
  const totalCategories = countCategories(value.categories);

  // Recursive renderer for nested categories
  const renderCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode => {
    if (cats.length === 0) return null;
    return (
      <ul
        className={`mt-2 ${level > 0 ? "ml-4 border-l border-gray-200 pl-4" : ""} space-y-1`}
      >
        {cats.map((cat) => (
          <li key={cat.id}>
            <div className="flex items-center text-gray-700">
              <LucideReact.Tag className="text-gray-500 mr-2" size={16} />
              <span className="font-medium truncate">{cat.name}</span>
              <span className="ml-2 text-xs text-gray-500">({cat.code})</span>
            </div>
            {renderCategories(cat.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center mb-2">
        <LucideReact.Globe className="text-blue-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
          {value.code}
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <LucideReact.Calendar className="mr-1" size={16} />
        <span>Created on {formattedCreatedAt}</span>
      </div>
      <div className="text-gray-700 text-sm">
        <div className="flex items-center mb-1">
          <LucideReact.List className="text-gray-500 mr-2" size={16} />
          <span>Total Categories: {totalCategories}</span>
        </div>
        {value.categories.length > 0 ? (
          renderCategories(value.categories)
        ) : (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle className="mr-2" size={24} />
            <span>No categories available</span>
          </div>
        )}
      </div>
    </div>
  );
}
