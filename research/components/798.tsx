import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export interface deploy_key {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedKey =
    value.key.length > 10
      ? `${value.key.slice(0, 4)}…${value.key.slice(-4)}`
      : value.key;
  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedLastUsed = value.last_used
    ? new Date(value.last_used).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : undefined;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <LucideReact.Key className="text-indigo-500" size={20} />
          <h3 className="ml-2 text-lg font-semibold text-gray-900 truncate">
            {value.title}
          </h3>
          {value.verified && (
            <LucideReact.CheckCircle
              className="ml-2 text-green-500"
              size={18}
              aria-label="Verified"
            />
          )}
        </div>
        {typeof value.enabled === "boolean" && (
          <div className="flex items-center">
            {value.enabled ? (
              <LucideReact.ToggleRight
                className="text-green-500"
                size={18}
                aria-label="Enabled"
              />
            ) : (
              <LucideReact.ToggleLeft
                className="text-red-500"
                size={18}
                aria-label="Disabled"
              />
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center text-sm text-gray-700">
        <LucideReact.Code className="text-gray-400" size={16} />
        <span className="ml-2 font-mono select-all">{maskedKey}</span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">{formattedCreated}</span>
        </div>

        {formattedLastUsed && (
          <div className="flex items-center">
            <LucideReact.Clock className="text-gray-400" size={16} />
            <span className="ml-1">{formattedLastUsed}</span>
          </div>
        )}

        <div className="flex items-center">
          <LucideReact.Lock className="text-gray-400" size={16} />
          <span className="ml-1">
            {value.read_only ? "Read-only" : "Read/write"}
          </span>
        </div>

        <div className="flex items-center overflow-hidden">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span className="ml-1 truncate">{value.url}</span>
        </div>

        {value.added_by && (
          <div className="flex items-center col-span-full">
            <LucideReact.User className="text-gray-400" size={16} />
            <span className="ml-1">{value.added_by}</span>
          </div>
        )}
      </div>
    </div>
  );
}
