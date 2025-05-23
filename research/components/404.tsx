import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A self hosted runner
     *
     * @title Self hosted runners
    */
    export interface runner {
        /**
         * The ID of the runner.
        */
        id: number & tags.Type<"int32">;
        /**
         * The ID of the runner group.
        */
        runner_group_id?: number & tags.Type<"int32">;
        /**
         * The name of the runner.
        */
        name: string;
        /**
         * The Operating System of the runner.
        */
        os: string;
        /**
         * The status of the runner.
        */
        status: string;
        busy: boolean;
        labels: AutoViewInputSubTypes.runner_label[];
        ephemeral?: boolean;
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export interface runner_label {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.runner;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    os,
    status,
    busy,
    labels,
    ephemeral,
  } = value;

  // Derive a clean, capitalized status text
  const statusText = busy
    ? "Busy"
    : status.charAt(0).toUpperCase() + status.slice(1);

  // Select an icon based on runner status (busy overrides)
  const statusIcon = busy ? (
    <LucideReact.Loader className="animate-spin text-amber-500" size={20} />
  ) : (() => {
    const s = status.toLowerCase();
    if (["online", "active"].includes(s)) {
      return <LucideReact.CheckCircle className="text-green-500" size={20} />;
    }
    if (["offline", "stopped", "inactive"].includes(s)) {
      return <LucideReact.XCircle className="text-red-500" size={20} />;
    }
    if (["idle", "pending", "paused"].includes(s)) {
      return <LucideReact.Clock className="text-amber-500" size={20} />;
    }
    return <LucideReact.Circle className="text-gray-400" size={20} />;
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {statusIcon}
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h2>
        </div>
        {ephemeral && (
          <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            Ephemeral
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Monitor size={16} />
          <span className="truncate">{os}</span>
        </div>
        <div className="flex items-center gap-1">
          {busy ? (
            <>
              <LucideReact.Loader className="animate-spin text-amber-500" size={16} />
              <span>{statusText}</span>
            </>
          ) : (
            <>
              {statusText === "Busy" ? null : statusIcon}
              <span>{statusText}</span>
            </>
          )}
        </div>
      </div>
      {labels && labels.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {labels.map((label) => (
            <span
              key={label.id ?? label.name}
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                label.type === "read-only"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
