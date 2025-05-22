import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export type IInvert = {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | any;
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Build an ordered list of category names from root to the current category.
  const hierarchy: string[] = [];
  let node: any = value;
  while (node) {
    hierarchy.unshift(node.name);
    node = node.parent;
  }

  // Format the creation date into a human-readable form.
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Breadcrumb / Hierarchy */}
      <div className="text-gray-500 text-sm mb-2 truncate">
        {hierarchy.join(' / ')}
      </div>

      {/* Category Name */}
      <h2 className="text-xl font-semibold text-gray-900 truncate">
        {value.name}
      </h2>

      {/* Metadata: Code & Creation Date */}
      <div className="mt-3 flex flex-wrap text-gray-600 text-sm space-x-4">
        <div className="flex items-center">
          <span className="font-medium">Code:</span>
          <span className="ml-1 truncate">{value.code}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Created:</span>
          <span className="ml-1">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
