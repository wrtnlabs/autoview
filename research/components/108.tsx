import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
  AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const renderCategory = (
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
  ): JSX.Element => (
    <li key={cat.id}>
      <div className="flex flex-col sm:flex-row sm:justify-between bg-gray-50 p-3 rounded-md">
        <div>
          <span className="font-medium text-gray-800">{cat.name}</span>
        </div>
        <div className="flex items-center mt-2 sm:mt-0 space-x-4 text-gray-500 text-sm">
          <div className="flex items-center">
            <LucideReact.Tag size={16} className="mr-1" />
            <span>{cat.code}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span>{formatDate(cat.created_at)}</span>
          </div>
        </div>
      </div>
      {cat.children.length > 0 && (
        <ul className="mt-2 ml-4 space-y-2">
          {cat.children.map((child) => renderCategory(child))}
        </ul>
      )}
    </li>
  );

  // 3. Return the React element.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 flex items-center justify-center text-gray-400">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No categories available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Category Hierarchy
      </h2>
      <ul className="space-y-3">{value.map((cat) => renderCategory(cat))}</ul>
    </div>
  );
}
