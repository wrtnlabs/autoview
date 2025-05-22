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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Build a breadcrumb path from root parent to current category.
  const parentNames: string[] = [];
  let cursor: AutoViewInput | null = value.parent;
  while (cursor) {
    parentNames.unshift(cursor.name);
    cursor = cursor.parent;
  }
  const breadcrumb = [...parentNames, value.name];

  //    Format creation date for readability.
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Category Title */}
      <div className="flex items-center text-lg font-semibold text-gray-800 truncate">
        <LucideReact.Tag
          className="mr-2 text-blue-500"
          size={20}
          strokeWidth={1.5}
        />
        <span>{value.name}</span>
      </div>

      {/* Breadcrumb Path */}
      {breadcrumb.length > 1 && (
        <div className="mt-2 flex items-center text-sm text-gray-500 overflow-x-auto">
          {breadcrumb.map((segment, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <LucideReact.ChevronRight className="mx-1" size={12} />
              )}
              <span className="truncate">{segment}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Metadata: Created Date & Code */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1 text-gray-400" size={16} />
          <span>Created: {formattedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Hash className="mr-1 text-gray-400" size={16} />
          <span className="font-mono truncate">{value.code}</span>
        </div>
      </div>
    </div>
  );
}
