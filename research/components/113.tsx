import * as LucideReact from "lucide-react";
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
  const formattedChannelCreatedAt = new Date(
    value.created_at,
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Recursive renderer for nested categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): JSX.Element => (
    <ul className={`${depth > 0 ? "pl-4 border-l border-gray-200" : ""}`}>
      {categories.map((cat) => (
        <li key={cat.id} className="flex items-start gap-2 py-1">
          <LucideReact.Tag
            size={16}
            className="text-blue-500 flex-shrink-0 mt-1"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="font-medium text-gray-800 truncate">
              {cat.name}
            </span>
            <span className="text-gray-500 text-xs truncate">
              Code: {cat.code}
            </span>
          </div>
          {cat.children &&
            cat.children.length > 0 &&
            renderCategories(cat.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Channel header */}
      <div className="mb-4 flex items-center gap-2">
        <LucideReact.Layers
          size={20}
          className="text-indigo-500 flex-shrink-0"
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>

      {/* Channel metadata */}
      <div className="mb-3 flex flex-wrap items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.Code size={16} className="text-gray-400" />
          <span className="truncate">{value.code}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <time dateTime={value.created_at}>{formattedChannelCreatedAt}</time>
        </div>
      </div>

      {/* Categories tree */}
      {value.categories.length > 0 ? (
        <div className="text-sm text-gray-700">
          {renderCategories(value.categories)}
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="flex-shrink-0" />
          <span className="ml-2">No categories available</span>
        </div>
      )}
    </div>
  );
}
