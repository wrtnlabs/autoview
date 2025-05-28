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
  // Format ISO date to a readable string
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // Empty state when no categories are provided
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No categories available</span>
      </div>
    );
  }

  // Recursive renderer for hierarchical categories
  const renderNode = (
    cat: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical
  ): JSX.Element => (
    <li key={cat.id}>
      <div className="flex items-center gap-2">
        <LucideReact.Tag className="text-blue-500" size={16} />
        <span className="font-medium text-gray-800">{cat.name}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
          {cat.code}
        </span>
        <div className="flex items-center ml-auto text-gray-400">
          <LucideReact.Calendar size={16} />
          <time dateTime={cat.created_at} className="ml-1 text-xs">
            {formatDate(cat.created_at)}
          </time>
        </div>
      </div>
      {cat.children.length > 0 && (
        <ul className="mt-2 space-y-2 ml-6 border-l border-gray-200 pl-4">
          {cat.children.map(child => renderNode(child))}
        </ul>
      )}
    </li>
  );

  // Main render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ul className="space-y-2">{value.map(cat => renderNode(cat))}</ul>
    </div>
  );
}
