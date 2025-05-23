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
  //    Build a list of ancestor category names from root to immediate parent.
  const ancestorNames: string[] = [];
  let current = value.parent;
  while (current) {
    ancestorNames.push(current.name);
    current = current.parent;
  }
  // Reverse to have root-first order
  ancestorNames.reverse();

  //    Format creation date
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full sm:max-w-md p-4 bg-white rounded-lg shadow-md">
      {ancestorNames.length > 0 && (
        <div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
          {ancestorNames.map((name, idx) => (
            <span key={idx} className="inline-flex items-center">
              {idx > 0 && (
                <LucideReact.ChevronsRight
                  size={12}
                  className="mx-1 text-gray-400"
                  aria-hidden="true"
                />
              )}
              <span className="truncate">{name}</span>
            </span>
          ))}
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
      <p className="mt-1 text-sm text-gray-500">
        <span className="font-mono">Code:</span> {value.code}
      </p>
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
        <time dateTime={value.created_at}>{formattedCreatedAt}</time>
      </div>
    </div>
  );
}
