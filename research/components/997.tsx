import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Key Simple
     *
     * @title Key Simple
    */
    export interface key_simple {
        id: number & tags.Type<"int32">;
        key: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.key_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Mask long keys for readability, showing first 6 and last 4 characters.
  const maskKey = (k: string): string =>
    k.length > 12 ? `${k.slice(0, 6)}…${k.slice(-4)}` : k;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No keys available</span>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {value.map((item) => (
        <li
          key={item.id}
          className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <LucideReact.Key size={20} className="flex-shrink-0 text-gray-500" />
          <span
            className="ml-2 font-mono text-gray-900 truncate"
            title={item.key}
          >
            {maskKey(item.key)}
          </span>
        </li>
      ))}
    </ul>
  );
}
