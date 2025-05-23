import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export interface IInvert {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Build the parent chain (e.g., ["Electronics", "Phones"])
  const parentChain: string[] = [];
  let current = value.parent;
  while (current) {
    parentChain.unshift(current.name);
    current = current.parent;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Category Name */}
      <div className="flex items-center mb-2">
        <LucideReact.Tag
          size={20}
          className="mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>

      {/* Category Code */}
      <div className="flex items-center mb-2">
        <LucideReact.Hash
          size={16}
          className="mr-2 text-gray-500"
          aria-hidden="true"
        />
        <span className="text-sm text-gray-700">
          Code: <span className="font-medium">{value.code}</span>
        </span>
      </div>

      {/* Parent Chain */}
      {parentChain.length > 0 && (
        <div className="flex items-center mb-2">
          <LucideReact.Folder
            size={16}
            className="mr-2 text-gray-500"
            aria-hidden="true"
          />
          <span
            className="text-sm text-gray-700 truncate"
            title={parentChain.join(' / ')}
          >
            {parentChain.join(' / ')}
          </span>
        </div>
      )}

      {/* Creation Date */}
      <div className="flex items-center">
        <LucideReact.Calendar
          size={16}
          className="mr-2 text-gray-500"
          aria-hidden="true"
        />
        <span className="text-sm text-gray-700">
          Created on: <span className="font-medium">{createdAt}</span>
        </span>
      </div>
    </div>
  );
}
