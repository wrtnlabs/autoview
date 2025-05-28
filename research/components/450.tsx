import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Hook
     *
     * @title Org Hook
    */
    export interface org_hook {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        name: string;
        events: string[];
        active: boolean;
        config: {
            url?: string;
            insecure_ssl?: string;
            content_type?: string;
            secret?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        type: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_hook[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No hooks available.</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {value.map((hook) => (
        <div
          key={hook.id}
          className="p-4 bg-white rounded-lg shadow flex flex-col space-y-3"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <LucideReact.Link size={20} className="text-gray-500" />
              <span className="font-semibold text-gray-800 truncate">
                {hook.name}
              </span>
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                {hook.type}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {hook.active ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                ) : (
                  <LucideReact.XCircle size={16} className="text-red-500" />
                )}
                <span className="text-sm text-gray-600">
                  {hook.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Created {formatDate(hook.created_at)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Edit2 size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Updated {formatDate(hook.updated_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600 truncate">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="truncate">{hook.url}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <LucideReact.ListChecks size={16} className="text-gray-400" />
              {hook.events.map((event) => (
                <span
                  key={event}
                  className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full"
                >
                  {event}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
