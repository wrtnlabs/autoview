import { tags } from "typia";
import React from "react";
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
  const maskKey = (key: string): string =>
    key.length > 8 ? `${key.slice(0, 4)}…${key.slice(-4)}` : key;

  const formattedDate = (() => {
    try {
      const date = new Date(value.created_at);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return value.created_at;
    }
  })();

  const statusBadge = (label: string, active: boolean, color: string) => (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {label}
    </span>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.title}</h2>

      {/* API Key */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-600 mb-1">Key</label>
        <div className="w-full bg-gray-100 text-gray-900 font-mono text-sm px-3 py-2 rounded select-all truncate">
          {maskKey(value.key)}
        </div>
      </div>

      {/* URL */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-600 mb-1">URL</label>
        <p className="text-sm text-blue-600 truncate">{value.url}</p>
      </div>

      {/* Creation Date */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-600 mb-1">Created</label>
        <p className="text-sm text-gray-700">{formattedDate}</p>
      </div>

      {/* Status Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {statusBadge("Verified", value.verified, value.verified ? "green" : "red")}
        {statusBadge("Read Only", value.read_only, value.read_only ? "blue" : "gray")}
      </div>
    </div>
  );
}
