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
  const channelCreated = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const totalCategories = (function count(
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number {
    return cats.reduce((sum, cat) => sum + 1 + count(cat.children), 0);
  })(value.categories);

  // Recursive renderer for the category tree
  function renderCategories(
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): React.ReactNode {
    return cats.map((cat) => (
      <li key={cat.id}>
        <div className="flex items-center" style={{ marginLeft: depth * 16 }}>
          <LucideReact.Tag
            size={16}
            className="text-gray-400 mr-2 flex-shrink-0"
          />
          <span className="text-gray-700 truncate">{cat.name}</span>
          <span className="ml-2 text-sm text-gray-500">({cat.code})</span>
        </div>
        {cat.children.length > 0 && (
          <ul className="mt-1 space-y-1">
            {renderCategories(cat.children, depth + 1)}
          </ul>
        )}
      </li>
    ));
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Channel Header */}
      <div className="flex items-center mb-2">
        <LucideReact.ShoppingCart className="text-indigo-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Channel Metadata */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 space-x-4">
        <div className="flex items-center">
          <LucideReact.Hash className="mr-1" size={14} />
          <span>Code: {value.code}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={14} />
          <span>Created: {channelCreated}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.List className="mr-1" size={14} />
          <span>Categories: {totalCategories}</span>
        </div>
      </div>

      {/* Category Tree */}
      {value.categories.length > 0 ? (
        <ul className="space-y-2">{renderCategories(value.categories)}</ul>
      ) : (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          <span>No categories available</span>
        </div>
      )}
    </div>
  );
}
