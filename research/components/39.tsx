import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const renderCategory = (
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    level = 0
  ): React.ReactNode => (
    <div key={cat.id}>
      <div
        className="flex items-center justify-between py-2"
        style={{ marginLeft: level * 16 }}
      >
        <div className="flex items-center space-x-2 truncate">
          <LucideReact.Tag className="text-blue-500" size={16} />
          <span className="font-medium text-gray-800 truncate">
            {cat.name}
          </span>
          <span className="text-sm text-gray-500 truncate">
            ({cat.code})
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-400">
          <LucideReact.Calendar size={16} />
          <span>{formatDate(cat.created_at)}</span>
        </div>
      </div>
      {cat.children &&
        cat.children.length > 0 &&
        cat.children.map((child) => renderCategory(child, level + 1))}
    </div>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No categories available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {value.map((cat) => renderCategory(cat))}
    </div>
  );
}
