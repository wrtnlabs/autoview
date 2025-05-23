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
  // 1. Data aggregation/transformation
  // Count total categories in the hierarchy
  const countCategories = (categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[]): number =>
    categories.reduce((sum, cat) => sum + 1 + countCategories(cat.children), 0);

  // Format creation date
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Total number of categories
  const totalCategories = countCategories(value.categories);

  // Recursive renderer for nested categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[]
  ): React.ReactNode => (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.id}>
          <div className="flex items-center gap-2">
            <LucideReact.Tag size={16} className="text-blue-500" />
            <span className="font-medium text-gray-800 truncate">{cat.name}</span>
            <span className="text-gray-500 text-sm truncate">({cat.code})</span>
          </div>
          {cat.children.length > 0 && (
            <div className="ml-6 mt-1">{renderCategories(cat.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <LucideReact.Tag size={16} />
            <span className="truncate">{value.code}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.List size={16} />
            <span>{totalCategories} Categories</span>
          </div>
        </div>
      </div>

      {value.categories.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          {renderCategories(value.categories)}
        </div>
      ) : (
        <div className="mt-4 flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No categories available.</span>
        </div>
      )}
    </div>
  );
}
