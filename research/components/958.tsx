import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Key
     *
     * @title Key
    */
    export interface key {
        key: string;
        id: number & tags.Type<"int32">;
        url: string;
        title: string;
        created_at: string & tags.Format<"date-time">;
        verified: boolean;
        read_only: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedKey =
    value.key.length > 8
      ? `${value.key.slice(0, 4)}…${value.key.slice(-4)}`
      : value.key;
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h3>
        <div className="flex items-center space-x-2">
          {value.verified && (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Verified"
            />
          )}
          {value.read_only && (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Read-only"
            />
          )}
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        <LucideReact.Key size={16} className="text-gray-400" />
        <span className="font-mono break-all">{maskedKey}</span>
      </div>
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        <LucideReact.Link size={16} className="text-gray-400" />
        <span className="truncate">{value.url}</span>
      </div>
      <div className="flex items-center text-sm text-gray-700 space-x-2">
        <LucideReact.Calendar size={16} className="text-gray-400" />
        <time dateTime={value.created_at} className="truncate">
          {formattedDate}
        </time>
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
