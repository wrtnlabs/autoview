import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposDependencyGraphSnapshots {
        export type PostResponse = {
            /**
             * ID of the created snapshot.
            */
            id: number & tags.Type<"int32">;
            /**
             * The time at which the snapshot was created.
            */
            created_at: string;
            /**
             * Either "SUCCESS", "ACCEPTED", or "INVALID". "SUCCESS" indicates that the snapshot was successfully created and the repository's dependencies were updated. "ACCEPTED" indicates that the snapshot was successfully created, but the repository's dependencies were not updated. "INVALID" indicates that the snapshot was malformed.
            */
            result: string;
            /**
             * A message providing further details about the result, such as why the dependencies were not updated.
            */
            message: string;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposDependencyGraphSnapshots.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedDate = createdDate.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // Map the raw result to a friendly label and a color for the badge
  const statusMap: Record<string, { label: string; color: "green" | "yellow" | "red" | "gray" }> = {
    SUCCESS: { label: "Success", color: "green" },
    ACCEPTED: { label: "Accepted", color: "yellow" },
    INVALID: { label: "Invalid", color: "red" },
  };
  const { label: statusLabel, color: statusColor } =
    statusMap[value.result] ?? { label: value.result, color: "gray" };

  // Determine badge style classes based on statusColor
  const badgeClass =
    statusColor === "green"
      ? "bg-green-100 text-green-800"
      : statusColor === "yellow"
      ? "bg-yellow-100 text-yellow-800"
      : statusColor === "red"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Date and Status Badge */}
      <div className="flex items-center justify-between mb-2">
        <time dateTime={value.created_at} className="text-sm text-gray-500">
          {formattedDate}
        </time>
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${badgeClass}`}
        >
          {statusLabel}
        </span>
      </div>
      {/* Message */}
      <p className="text-gray-700 text-sm line-clamp-3">
        {value.message || "-"}
      </p>
    </div>
  );
}
