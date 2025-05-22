import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Key Simple
   *
   * @title Key Simple
   */
  export type key_simple = {
    id: number & tags.Type<"int32">;
    key: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.key_simple[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasItems = Array.isArray(value) && value.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const listView = (
    <ul className="space-y-3">
      {value.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-2">
            <LucideReact.Hash className="text-gray-500" size={16} />
            <span className="text-sm text-gray-700">#{item.id}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <LucideReact.Key className="text-indigo-500" size={16} />
            <span className="text-sm text-gray-900 truncate" title={item.key}>
              {item.key}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );

  const emptyView = (
    <div className="flex flex-col items-center justify-center text-gray-400 py-10">
      <LucideReact.AlertCircle size={24} />
      <span className="mt-2 text-sm">No items available</span>
    </div>
  );

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {hasItems ? listView : emptyView}
    </div>
  );
}
