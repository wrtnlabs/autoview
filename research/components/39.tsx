import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Recursive renderer for hierarchical categories
  const renderCategory = (
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    depth: number = 0,
  ): React.ReactNode => {
    const indent = depth * 16; // pixels
    return (
      <div
        key={cat.id}
        style={{ marginLeft: indent }}
        className="bg-white shadow rounded-lg p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {cat.name}
          </h3>
          {cat.children.length > 0 && (
            <span className="text-sm text-gray-500">
              {cat.children.length} sub
              {cat.children.length === 1 ? "category" : "categories"}
            </span>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Code:</span> {cat.code}
        </div>
        <div className="mt-1 text-sm text-gray-600">
          <span className="font-medium">Created:</span> {formatDate(cat.created_at)}
        </div>
        {cat.children.length > 0 && (
          <div className="mt-4 space-y-2">
            {cat.children.map((child) => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No categories available.
      </div>
    );
  }

  // 3. Return the React element.
  return <div className="space-y-2">{value.map((cat) => renderCategory(cat))}</div>;
}
