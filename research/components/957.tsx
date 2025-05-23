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
  const maskedKey = (() => {
    const raw = value.key;
    if (raw.length > 8) {
      return `${raw.slice(0, 4)}…${raw.slice(-4)}`;
    }
    return raw;
  })();

  const formattedDate = (() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value.created_at));
    } catch {
      return value.created_at;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title and status icons */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h3>
        <div className="flex items-center gap-2">
          {value.verified ? (
            <span role="img" aria-label="Verified">
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
              />
            </span>
          ) : (
            <span role="img" aria-label="Not verified">
              <LucideReact.XCircle
                className="text-red-500"
                size={16}
              />
            </span>
          )}
          {value.read_only && (
            <span role="img" aria-label="Read only">
              <LucideReact.Lock
                className="text-gray-500"
                size={16}
              />
            </span>
          )}
        </div>
      </div>

      {/* Masked API Key */}
      <div className="font-mono text-sm text-gray-700 break-all mb-3">
        {maskedKey}
      </div>

      {/* Meta: creation date and URL */}
      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 overflow-hidden">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.url}</span>
        </div>
      </div>
    </div>
  );
}
