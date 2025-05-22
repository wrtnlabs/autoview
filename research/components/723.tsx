import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposDependencyGraphSnapshots.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusConfig = {
    SUCCESS: {
      label: "Success",
      Icon: LucideReact.CheckCircle,
      colorClass: "text-green-500",
    },
    ACCEPTED: {
      label: "Accepted",
      Icon: LucideReact.Clock,
      colorClass: "text-amber-500",
    },
    INVALID: {
      label: "Invalid",
      Icon: LucideReact.AlertTriangle,
      colorClass: "text-red-500",
    },
  } as const;

  const {
    label: statusLabel,
    Icon: StatusIcon,
    colorClass: statusColor,
  } = statusConfig[value.result as keyof typeof statusConfig] || {
    label: value.result,
    Icon: LucideReact.AlertCircle,
    colorClass: "text-gray-500",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          Snapshot #{value.id}
        </h2>
        <span
          className={`mt-2 sm:mt-0 flex items-center text-sm font-medium ${statusColor}`}
        >
          <StatusIcon className="mr-1" size={16} />
          {statusLabel}
        </span>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar className="mr-1" size={16} />
        <time dateTime={value.created_at}>{formattedDate}</time>
      </div>
      {value.message && (
        <p className="mt-4 text-sm text-gray-700 line-clamp-3">
          {value.message}
        </p>
      )}
    </div>
  );
}
