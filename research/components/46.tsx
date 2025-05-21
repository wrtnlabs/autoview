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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    cats.reduce(
      (sum, cat) =>
        sum +
        1 +
        (cat.children?.length
          ? countCategories(cat.children)
          : 0),
      0,
    );

  const totalCategories = countCategories(value.categories);

  // Recursive renderer for nested categories
  const renderCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level: number = 0,
  ): React.ReactNode => (
    <ul
      className={`${
        level === 0 ? "list-disc list-inside" : "list-disc list-inside ml-4"
      } space-y-2`}
    >
      {cats.map((cat) => (
        <li key={cat.id}>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-800">{cat.name}</span>
            <span className="text-xs text-gray-500">{cat.code}</span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Created:{" "}
            <time dateTime={cat.created_at}>
              {formatDate(cat.created_at)}
            </time>
          </div>
          {cat.children.length > 0 &&
            renderCategories(cat.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  // 2 & 3. Compose and return the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {value.name}
        </h2>
        <div className="flex flex-wrap items-center space-x-2 mt-1 text-sm text-gray-500">
          <span>
            Code:{" "}
            <span className="font-medium text-gray-700">
              {value.code}
            </span>
          </span>
          <span>
            · Created:{" "}
            <time dateTime={value.created_at}>
              {formatDate(value.created_at)}
            </time>
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-3">
          Categories ({totalCategories})
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
