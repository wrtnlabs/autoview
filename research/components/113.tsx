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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    cats.reduce(
      (sum, c) => sum + 1 + countCategories(c.children),
      0,
    );

  const totalCategories = countCategories(value.categories);

  // Recursive renderer for nested categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): React.ReactNode => (
    <ul
      className={`list-disc list-inside ${
        depth > 0 ? "pl-4" : ""
      } space-y-1`}
    >
      {categories.map((cat) => (
        <li key={cat.id}>
          <div className="flex items-center">
            <span className="font-medium text-gray-800 truncate">
              {cat.name}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              ({cat.code})
            </span>
          </div>
          {cat.children.length > 0 &&
            renderCategories(cat.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
          <div>
            Code:{" "}
            <span className="font-medium text-gray-700">
              {value.code}
            </span>
          </div>
          <div>
            Created:{" "}
            <span className="font-medium text-gray-700">
              {formatDate(value.created_at)}
            </span>
          </div>
          <div>
            Categories:{" "}
            <span className="font-medium text-gray-700">
              {totalCategories}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-2">
          Category Hierarchy
        </h3>
        {value.categories.length > 0 ? (
          renderCategories(value.categories)
        ) : (
          <p className="text-sm text-gray-500">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
}
