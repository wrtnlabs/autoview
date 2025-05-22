import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.project_column[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Sort columns by creation date (newest first)
  const sortedColumns = [...value].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    // Empty state
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No project columns available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4">
      {/* Header with total count */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.List size={20} className="text-gray-500" />
        <span className="ml-2 text-lg font-medium">
          {sortedColumns.length} Columns
        </span>
      </div>

      {/* Grid of project column cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedColumns.map((column) => (
          <li
            key={column.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Column name */}
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 truncate">
              <LucideReact.Columns size={20} className="text-gray-500" />
              {column.name}
            </h3>

            {/* Created and updated dates */}
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created {formatDate(column.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Updated {formatDate(column.updated_at)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
