import { tags } from "typia";
import React from "react";
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
  const totalItems = value.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We display a summary count and a responsive list of key items.
  //    Id is shown as a subdued badge; key text is truncated if too long.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="mb-3 text-sm text-gray-600">
        Total items: {totalItems}
      </div>

      {totalItems === 0 ? (
        <div className="py-6 text-center text-gray-500">
          No keys available.
        </div>
      ) : (
        <ul className="space-y-2">
          {value.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-900 font-medium truncate">
                {item.key}
              </span>
              <span className="text-sm text-gray-500">
                #{item.id}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
