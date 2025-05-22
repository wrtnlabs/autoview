import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingChannel.IHierarchical;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const countCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    categories.reduce((sum, cat) => sum + 1 + countCategories(cat.children), 0);

  const totalCategories = countCategories(value.categories);

  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode[] =>
    categories.map((cat) => (
      <li key={cat.id} style={{ marginLeft: level * 16 }} className="mb-2">
        <div className="flex items-center space-x-2">
          <LucideReact.Tag
            size={16}
            className="text-gray-500"
            strokeWidth={1.5}
          />
          <span className="font-medium text-gray-800 truncate">{cat.name}</span>
          <span className="text-sm text-gray-500 truncate">({cat.code})</span>
        </div>
        <div className="flex items-center text-xs text-gray-400 ml-6 mt-0.5">
          <LucideReact.Calendar size={12} />
          <span className="ml-1">{formatDate(cat.created_at)}</span>
        </div>
        {cat.children.length > 0 && (
          <ul className="mt-2">{renderCategories(cat.children, level + 1)}</ul>
        )}
      </li>
    ));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center space-x-2">
        <LucideReact.ShoppingCart
          size={20}
          className="text-blue-500"
          strokeWidth={1.5}
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span className="text-sm text-gray-500 truncate">({value.code})</span>
      </div>
      <div className="flex items-center mt-1 text-sm text-gray-500 space-x-1">
        <LucideReact.Calendar size={16} />
        <span>{formatDate(value.created_at)}</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <LucideReact.List size={16} className="mr-1" />
          <span>Categories ({totalCategories})</span>
        </div>
        {value.categories.length > 0 ? (
          <ul className="list-none">{renderCategories(value.categories)}</ul>
        ) : (
          <div className="text-sm text-gray-500">No categories available.</div>
        )}
      </div>
    </div>
  );
}
