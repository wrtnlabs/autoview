import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Set secrets for GitHub Actions.
   *
   * @title Actions Secret
   */
  export type actions_secret = {
    /**
     * The name of the secret.
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_secret;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key className="text-indigo-500" size={24} />
        <h2
          className="ml-2 text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>
      <dl className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <dt className="sr-only">Created</dt>
          <dd className="ml-1">Created on {createdAt}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock className="text-gray-400" size={16} />
          <dt className="sr-only">Updated</dt>
          <dd className="ml-1">Updated on {updatedAt}</dd>
        </div>
      </dl>
    </div>
  );
}
