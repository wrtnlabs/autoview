import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Actions workflow
     *
     * @title Workflow
    */
    export type workflow = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        path: string;
        state: "active" | "deleted" | "disabled_fork" | "disabled_inactivity" | "disabled_manually";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        url: string;
        html_url: string;
        badge_url: string;
        deleted_at?: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.workflow;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateStyles: Record<
    AutoViewInput["state"],
    { label: string; bg: string; text: string }
  > = {
    active: { label: "Active", bg: "bg-green-100", text: "text-green-800" },
    deleted: { label: "Deleted", bg: "bg-red-100", text: "text-red-800" },
    disabled_fork: {
      label: "Disabled (Fork)",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    disabled_inactivity: {
      label: "Disabled (Inactivity)",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    disabled_manually: {
      label: "Disabled (Manually)",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
  };

  const { label, bg, text } = stateStyles[value.state];
  const dateOpts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedCreated = new Date(value.created_at).toLocaleDateString(
    undefined,
    dateOpts,
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(
    undefined,
    dateOpts,
  );
  const formattedDeleted = value.deleted_at
    ? new Date(value.deleted_at).toLocaleDateString(undefined, dateOpts)
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start">
      <img
        src={value.badge_url}
        alt={`${value.name} badge`}
        className="w-16 h-16 object-contain mb-4 md:mb-0 md:mr-4 flex-shrink-0"
      />
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium ${bg} ${text} rounded-full whitespace-nowrap`}
          >
            {label}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 truncate">{value.path}</p>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-400">
          <div>
            <span className="font-medium text-gray-600">Created:</span>{" "}
            <time dateTime={value.created_at}>{formattedCreated}</time>
          </div>
          <div>
            <span className="font-medium text-gray-600">Updated:</span>{" "}
            <time dateTime={value.updated_at}>{formattedUpdated}</time>
          </div>
          {formattedDeleted && (
            <div className="col-span-2 text-red-500">
              <span className="font-medium">Deleted:</span>{" "}
              <time dateTime={value.deleted_at!}>{formattedDeleted}</time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
