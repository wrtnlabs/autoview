import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;

// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived data: construct breadcrumb-style path from root to current category
  const ancestorNames: string[] = [];
  let current: AutoViewInput | null = value;
  while (current) {
    ancestorNames.push(current.name);
    current = current.parent;
  }
  const path = ancestorNames.reverse();

  // 2. Format the creation date into a human-readable string
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 3. JSX structure with Tailwind CSS for styling
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm">
      {/* Breadcrumb / Category Path */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2">
        <LucideReact.Tag size={16} className="mr-1 text-gray-500" />
        {path.map((name, idx) => (
          <span key={idx} className="flex items-center">
            <span className="truncate">{name}</span>
            {idx < path.length - 1 && (
              <LucideReact.ChevronRight
                size={12}
                className="mx-1 text-gray-300"
              />
            )}
          </span>
        ))}
      </div>

      {/* Category Title */}
      <h2 className="text-lg font-semibold text-gray-800 truncate mb-1">
        {value.name}
      </h2>

      {/* Category Code */}
      <div className="flex items-center text-xs font-mono text-gray-500 mb-3">
        <span className="bg-gray-100 px-2 py-0.5 rounded">{value.code}</span>
      </div>

      {/* Created Date */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1" />
        <span>Created on {createdDate}</span>
      </div>
    </div>
  );
}
