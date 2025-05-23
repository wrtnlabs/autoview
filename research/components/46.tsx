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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Recursive renderer for hierarchical categories
  function renderCategory(
    category: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    level = 0
  ): React.ReactNode {
    return (
      <li
        key={category.id}
        className={`${
          level > 0 ? "pl-4 border-l border-gray-200" : ""
        }`}
      >
        <div className="flex items-center space-x-2 py-1">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span className="text-gray-700 truncate">{category.name}</span>
          <span className="text-sm text-gray-400">({category.code})</span>
        </div>
        {category.children.length > 0 && (
          <ul className="mt-1 space-y-1">
            {category.children.map((child) =>
              renderCategory(child, level + 1)
            )}
          </ul>
        )}
      </li>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md md:w-full">
      {/* Channel Header */}
      <div className="flex items-center space-x-2">
        <LucideReact.ShoppingCart size={20} className="text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="text-sm text-gray-500 truncate">
          ({value.code})
        </span>
      </div>

      {/* Creation Date */}
      <div className="flex items-center text-sm text-gray-500 mt-2">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>Created on {formattedCreatedAt}</span>
      </div>

      {/* Categories Tree */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Categories
        </h3>
        {value.categories.length > 0 ? (
          <ul className="space-y-1 list-none">
            {value.categories.map((cat) => renderCategory(cat))}
          </ul>
        ) : (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={24} className="mr-2" />
            <span>No categories available</span>
          </div>
        )}
      </div>
    </div>
  );
}
