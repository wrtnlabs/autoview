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
  //    Build a breadcrumb path of category names from the root to the current category.
  const path: string[] = [];
  let cursor: any = value;
  while (cursor) {
    path.unshift(cursor.name);
    cursor = cursor.parent;
  }
  const breadcrumbs = path.slice(0, -1); // omit the current category from the breadcrumb list
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const element = (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      {breadcrumbs.length > 0 && (
        <nav className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
          {breadcrumbs.map((segment, idx) => (
            <React.Fragment key={idx}>
              <span className="truncate">{segment}</span>
              <span className="mx-1">/</span>
            </React.Fragment>
          ))}
          <span className="truncate text-gray-700">{value.name}</span>
        </nav>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Code:</span>{" "}
          <span className="truncate">{value.code}</span>
        </div>
        <div>
          <span className="font-medium">Created:</span> {formattedDate}
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  return element;
}
