import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Key
   *
   * @title Key
   */
  export type key = {
    key: string;
    id: number & tags.Type<"int32">;
    url: string;
    title: string;
    created_at: string & tags.Format<"date-time">;
    verified: boolean;
    read_only: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedKey =
    value.key.length > 8
      ? `${value.key.slice(0, 4)}…${value.key.slice(-4)}`
      : value.key;
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display as a card summarizing the API key details.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h3>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <LucideReact.Key
              size={16}
              className="text-gray-500 flex-shrink-0"
            />
            <span className="font-mono">{maskedKey}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Calendar
              size={16}
              className="text-gray-400 flex-shrink-0"
            />
            <span>{createdDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Link
              size={16}
              className="text-gray-400 flex-shrink-0"
            />
            <span className="truncate break-all">{value.url}</span>
          </div>
          <div className="flex items-center gap-2">
            {value.verified ? (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500 flex-shrink-0"
                aria-label="Verified"
              />
            ) : (
              <LucideReact.XCircle
                size={16}
                className="text-red-500 flex-shrink-0"
                aria-label="Not verified"
              />
            )}
            <span>{value.verified ? "Verified" : "Unverified"}</span>
          </div>
          {value.read_only && (
            <div className="flex items-center gap-2">
              <LucideReact.Lock
                size={16}
                className="text-gray-500 flex-shrink-0"
                aria-label="Read-only"
              />
              <span>Read-only</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
