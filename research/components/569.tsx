import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Project columns contain cards of work.
   *
   * @title Project Column
   */
  export type project_column = {
    url: string & tags.Format<"uri">;
    project_url: string & tags.Format<"uri">;
    cards_url: string & tags.Format<"uri">;
    /**
     * The unique identifier of the project column
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * Name of the project column
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.project_column;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formatDate = (date: Date) =>
    date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const created = formatDate(createdDate);
  const updated = formatDate(updatedDate);

  // Truncate URL for display (remove protocol and trailing slash)
  const truncateUrl = (url: string) =>
    url
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .replace(/\/$/, "")
      .slice(0, 40) + (url.length > 40 ? "…" : "");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag size={20} className="text-blue-500 flex-shrink-0" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 flex-shrink-0"
          />
          <span className="ml-1">Created: {created}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 flex-shrink-0"
          />
          <span className="ml-1">Updated: {updated}</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center text-xs text-gray-500">
          <LucideReact.Link size={14} className="text-gray-400 flex-shrink-0" />
          <span className="ml-1 truncate">{truncateUrl(value.url)}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <LucideReact.Link size={14} className="text-gray-400 flex-shrink-0" />
          <span className="ml-1 truncate">
            {truncateUrl(value.project_url)}
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <LucideReact.Link size={14} className="text-gray-400 flex-shrink-0" />
          <span className="ml-1 truncate">{truncateUrl(value.cards_url)}</span>
        </div>
      </div>
    </div>
  );
}
