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
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Build full hierarchy path from root to current category
  const pathNames: string[] = [];
  let node: any = value;
  while (node) {
    pathNames.unshift(node.name);
    node = node.parent;
  }
  const hierarchy = pathNames.join(" > ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
      {/* Category Title */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>

      {/* Details Section */}
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        {/* Code */}
        <div className="flex">
          <span className="w-24 font-medium">Code:</span>
          <span className="truncate">{value.code}</span>
        </div>

        {/* Hierarchy (only shown when there is a parent) */}
        {pathNames.length > 1 && (
          <div className="flex">
            <span className="w-24 font-medium">Hierarchy:</span>
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {hierarchy}
            </span>
          </div>
        )}

        {/* Creation Date */}
        <div className="flex">
          <span className="w-24 font-medium">Created:</span>
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
