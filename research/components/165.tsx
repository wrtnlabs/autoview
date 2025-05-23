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
  const formattedChannelDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Recursive renderer for nested categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): JSX.Element => (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.id}>
          <div className="flex items-center gap-1">
            <LucideReact.Tag size={16} className="text-gray-400" />
            <span className="font-medium text-gray-800 truncate">{cat.name}</span>
            <span className="text-gray-500 text-sm truncate">({cat.code})</span>
          </div>
          {cat.children.length > 0 && (
            <div className="ml-4 border-l border-gray-200 pl-4 mt-1">
              {renderCategories(cat.children)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-sm">
      {/* Channel Header */}
      <div className="flex items-center mb-2">
        <LucideReact.Layers size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      </div>

      {/* Channel Meta */}
      <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} />
          <span className="truncate">Code: {value.code}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span className="truncate">Created: {formattedChannelDate}</span>
        </div>
      </div>

      {/* Categories Tree */}
      {value.categories.length > 0 ? (
        <div>{renderCategories(value.categories)}</div>
      ) : (
        <div className="flex items-center justify-center text-gray-400 py-6">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No categories available</span>
        </div>
      )}
    </div>
  );
}
