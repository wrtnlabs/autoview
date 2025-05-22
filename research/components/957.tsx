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
  // 1. Data aggregation/transformation
  const maskedKey =
    value.key.length > 8
      ? `${value.key.slice(0, 4)}...${value.key.slice(-4)}`
      : value.key;
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const urlDisplay = value.url.replace(/^https?:\/\//, "");
  const truncatedUrl =
    urlDisplay.length > 30 ? `${urlDisplay.slice(0, 30)}...` : urlDisplay;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {value.title}
      </h2>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <LucideReact.Key size={16} className="text-gray-500" />
          <span className="font-mono">{maskedKey}</span>
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">{truncatedUrl}</span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {value.verified ? (
              <LucideReact.CheckCircle size={16} className="text-green-500" />
            ) : (
              <LucideReact.XCircle size={16} className="text-red-500" />
            )}
            <span>{value.verified ? "Verified" : "Unverified"}</span>
          </div>
          <div className="flex items-center gap-1">
            {value.read_only ? (
              <LucideReact.Lock size={16} className="text-gray-500" />
            ) : (
              <LucideReact.Unlock size={16} className="text-gray-500" />
            )}
            <span>{value.read_only ? "Read-only" : "Writable"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
