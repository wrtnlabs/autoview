import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * An SSH key granting access to a single repository.
   *
   * @title Deploy Key
   */
  export type deploy_key = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedKey =
    value.key.length > 10
      ? `${value.key.slice(0, 6)}…${value.key.slice(-4)}`
      : value.key;
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );
  const formattedLastUsed = value.last_used
    ? new Date(value.last_used).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Never used";
  const isEnabled = value.enabled ?? true;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="max-w-md mx-auto bg-white rounded-lg shadow p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h3>
        <span
          className={`inline-flex items-center text-sm font-medium px-2 py-0.5 rounded ${
            value.verified
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {value.verified ? (
            <LucideReact.CheckCircle
              size={16}
              className="mr-1 text-green-600"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.XCircle
              size={16}
              className="mr-1 text-gray-500"
              aria-hidden="true"
            />
          )}
          {value.verified ? "Verified" : "Unverified"}
        </span>
      </header>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <LucideReact.Key
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <span className="font-mono text-sm text-gray-700">{maskedKey}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Link
            size={16}
            className="text-gray-500"
            aria-hidden="true"
          />
          <span className="text-sm text-blue-600 truncate">{value.url}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          {value.read_only ? (
            <LucideReact.Lock
              size={16}
              className="text-yellow-500"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.Unlock
              size={16}
              className="text-green-500"
              aria-hidden="true"
            />
          )}
          <span>{value.read_only ? "Read-only" : "Writable"}</span>
        </div>
        <div className="flex items-center space-x-1">
          {isEnabled ? (
            <LucideReact.ToggleRight
              size={16}
              className="text-green-500"
              aria-hidden="true"
            />
          ) : (
            <LucideReact.ToggleLeft
              size={16}
              className="text-gray-400"
              aria-hidden="true"
            />
          )}
          <span>{isEnabled ? "Enabled" : "Disabled"}</span>
        </div>
        <div className="col-span-2 flex items-center space-x-2 text-gray-500">
          <LucideReact.Calendar size={16} aria-hidden="true" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="col-span-2 flex items-center space-x-2 text-gray-500">
          <LucideReact.Clock size={16} aria-hidden="true" />
          <span>Last used: {formattedLastUsed}</span>
        </div>
        {value.added_by && (
          <div className="col-span-2 flex items-center space-x-2 text-gray-600">
            <LucideReact.User size={16} aria-hidden="true" />
            <span>Added by: {value.added_by}</span>
          </div>
        )}
      </div>
    </article>
  );
}
