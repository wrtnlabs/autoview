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
  // Type alias for clarity
  type Hierarchical = AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical;

  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Count nested children recursively to get a total category count.
  const countChildren = (node: Hierarchical): number =>
    node.children.reduce((sum, child) => sum + 1 + countChildren(child), 0);
  const totalCount = value.reduce((sum, node) => sum + 1 + countChildren(node), 0);

  //    Format ISO date strings into a concise, readable format.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  //    Recursive renderer for a category node and its children.
  const renderNode = (node: Hierarchical): JSX.Element => (
    <li key={node.id}>
      <div className="flex items-center">
        <LucideReact.Tag size={16} className="text-blue-500 mr-2 flex-shrink-0" />
        <span className="font-medium text-gray-900 truncate">{node.name}</span>
        <span className="ml-2 text-gray-500 text-sm truncate">({node.code})</span>
        <span className="ml-auto text-gray-400 text-xs">{formatDate(node.created_at)}</span>
      </div>
      {node.children.length > 0 && (
        <ul className="mt-1 ml-6 border-l border-gray-200 pl-4 space-y-1">
          {node.children.map(child => renderNode(child))}
        </ul>
      )}
    </li>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-full overflow-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Trees size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Shopping Categories ({totalCount})
        </h2>
      </div>
      {value.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No categories available.</span>
        </div>
      ) : (
        <ul className="space-y-3">{value.map(node => renderNode(node))}</ul>
      )}
    </div>
  );
}
