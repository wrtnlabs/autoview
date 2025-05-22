import LucideReact from "lucide-react";
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
  // 1. Derive the full category path (breadcrumb) from root to current
  const categoryPath: string[] = [];
  let current: AutoViewInput | null = value;
  while (current) {
    categoryPath.unshift(current.name);
    current = current.parent;
  }

  // 2. Format the creation timestamp into a human-readable date
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  // 3. Compose and return the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Breadcrumb / Category path */}
      <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
        {categoryPath.map((name, index) => (
          <React.Fragment key={index}>
            <span className="truncate">{name}</span>
            {index < categoryPath.length - 1 && (
              <LucideReact.ChevronRight
                size={12}
                className="mx-1 text-gray-400"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main category title */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {value.name}
      </h2>

      {/* Meta info: code and creation date */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span className="ml-1 truncate">Code: {value.code}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-1">Created: {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
