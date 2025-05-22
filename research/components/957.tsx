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
  const maskedKey =
    typeof value.key === "string" && value.key.length > 8
      ? `${value.key.slice(0, 4)}…${value.key.slice(-4)}`
      : value.key;

  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const verifiedBadge = value.verified ? "Verified" : "Unverified";
  const verifiedClasses = value.verified
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  const accessBadge = value.read_only ? "Read-Only" : "Read-Write";
  const accessClasses = value.read_only
    ? "bg-gray-100 text-gray-800"
    : "bg-blue-100 text-blue-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md space-y-3">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.title}
      </h2>

      {/* URL */}
      <p className="text-sm text-gray-500 break-all">{value.url}</p>

      {/* Masked Key */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono text-gray-700">{maskedKey}</span>
      </div>

      {/* Created Date */}
      <p className="text-sm text-gray-500">Created: {createdDate}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${verifiedClasses}`}
        >
          {verifiedBadge}
        </span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${accessClasses}`}
        >
          {accessBadge}
        </span>
      </div>
    </div>
  );
}
