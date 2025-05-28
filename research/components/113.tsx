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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    cats.reduce(
      (acc, c) => acc + 1 + countCategories(c.children),
      0,
    );

  const totalCategories = countCategories(value.categories);

  // Recursive renderer for hierarchical categories
  const renderCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): React.ReactNode => (
    <ul className="mt-2 space-y-1">
      {cats.map((cat) => (
        <li key={cat.id}>
          <div className="flex items-center space-x-2">
            <LucideReact.Tag size={16} className="text-blue-400" aria-hidden="true" />
            <span className="font-medium text-gray-800 truncate">{cat.name}</span>
            <span className="text-sm text-gray-500">({cat.code})</span>
            <LucideReact.Calendar
              size={16}
              className="text-gray-400 ml-2"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-400">{formatDate(cat.created_at)}</span>
          </div>
          {cat.children.length > 0 && (
            <div className="ml-4">{renderCategories(cat.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Channel header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center space-x-2">
          <LucideReact.ShoppingCart
            size={24}
            className="text-blue-500"
            aria-hidden="true"
          />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <span className="text-sm text-gray-500">{value.code}</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-1">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-400">
            {formatDate(value.created_at)}
          </span>
        </div>
      </div>

      {/* Total categories count */}
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <LucideReact.List size={16} className="text-gray-500" aria-hidden="true" />
        <span className="ml-1">{totalCategories} categories</span>
      </div>

      {/* Categories tree or empty state */}
      {value.categories.length > 0 ? (
        <div className="mt-4">{renderCategories(value.categories)}</div>
      ) : (
        <div className="mt-4 flex items-center justify-center text-gray-400 p-4 border border-dashed rounded">
          <LucideReact.AlertCircle size={24} aria-hidden="true" />
          <span className="ml-2">No categories available</span>
        </div>
      )}
    </div>
  );
}
