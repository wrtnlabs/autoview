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
  // 1. Define data aggregation/transformation functions or derived constants
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Recursively count total categories (including nested)
  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    cats.reduce(
      (sum, cat) => sum + 1 + countCategories(cat.children),
      0,
    );

  const totalCategories = countCategories(value.categories);

  // Recursively render category items
  const renderCategoryItems = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): React.ReactNode[] =>
    cats.map((cat) => (
      <li key={cat.id} className="flex items-start">
        <LucideReact.Folder
          size={16}
          className="text-gray-400 mt-[3px] flex-shrink-0"
        />
        <span className="ml-2 text-gray-700">{cat.name}</span>
        {cat.children.length > 0 && (
          <ul className="ml-6 mt-1 space-y-1">
            {renderCategoryItems(cat.children)}
          </ul>
        )}
      </li>
    ));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Channel Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="text-sm text-gray-500">Code: {value.code}</span>
      </div>

      {/* Creation Date */}
      <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
        <LucideReact.Calendar size={16} className="text-gray-400" />
        <span>Created on {formattedCreatedAt}</span>
      </div>

      {/* Categories Tree */}
      {value.categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <LucideReact.List size={16} className="text-gray-500" />
            Categories ({totalCategories})
          </h3>
          <div className="mt-2 text-gray-700">
            <ul className="space-y-1">
              {renderCategoryItems(value.categories)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
