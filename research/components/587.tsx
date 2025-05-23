import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunners {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            runners: AutoViewInputSubTypes.runner[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helper functions
  const total = value.total_count;
  const getStatusIndicator = (
    status: string
  ): {
    icon: JSX.Element;
    title: string;
    bgColor: string;
    textColor: string;
  } => {
    const s = status.toLowerCase();
    if (s === "online") {
      return {
        icon: <LucideReact.CheckCircle size={14} className="text-green-500" />,
        title: "Online",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      };
    }
    if (s === "offline") {
      return {
        icon: <LucideReact.XCircle size={14} className="text-red-500" />,
        title: "Offline",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    }
    // fallback for other statuses
    return {
      icon: <LucideReact.Clock size={14} className="text-amber-500" />,
      title: status.charAt(0).toUpperCase() + status.slice(1),
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
    };
  };

  // 2. JSX structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4 text-lg font-semibold text-gray-800">
        <LucideReact.Users size={20} className="text-gray-600 mr-2" />
        <span>
          {total} Runner{total !== 1 ? "s" : ""}
        </span>
      </div>
      {/* Runner List */}
      <ul className="space-y-4">
        {value.runners.map((runner) => {
          const { icon, title, bgColor, textColor } = getStatusIndicator(
            runner.status
          );
          return (
            <li
              key={runner.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              {/* Name & OS */}
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-medium text-gray-800 truncate">
                    {runner.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 md:mt-0">
                  <LucideReact.Computer size={14} className="text-gray-400" />
                  <span>{runner.os}</span>
                </div>
              </div>
              {/* Status & Labels */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${bgColor} ${textColor} rounded-full`}
                  title={title}
                >
                  {icon}
                  <span className="ml-1">{title}</span>
                </span>
                {runner.busy && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                    <LucideReact.Loader
                      size={12}
                      className="mr-1 animate-spin text-blue-500"
                    />
                    Busy
                  </span>
                )}
                {runner.ephemeral && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                    <LucideReact.Tag
                      size={12}
                      className="mr-1 text-purple-500"
                    />
                    Ephemeral
                  </span>
                )}
                {runner.labels.map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
