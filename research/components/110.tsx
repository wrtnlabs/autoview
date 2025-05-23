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
  //    Build the full category path from root to the current category.
  const pathSegments: string[] = [];
  let current: AutoViewInput | null = value;
  while (current) {
    pathSegments.push(current.name);
    current = current.parent;
  }
  pathSegments.reverse();
  const fullPath = pathSegments.join(" / ");
  //    Format the creation date into a human-friendly string.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Category Title */}
      <div className="text-gray-900 font-semibold text-lg mb-3">
        {value.name}
      </div>

      {/* Details */}
      <div className="flex flex-col space-y-2 text-gray-700 text-sm">
        {/* Category Path (only if there is a parent) */}
        {value.parent && (
          <div className="flex items-center">
            <LucideReact.Folder size={16} className="text-gray-400 mr-1" aria-label="Category path" />
            <span className="truncate">{fullPath}</span>
          </div>
        )}

        {/* Category Code */}
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-blue-500 mr-1" aria-label="Category code" />
          <span className="font-mono text-gray-800">{value.code}</span>
        </div>

        {/* Creation Date */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" aria-label="Created at" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
