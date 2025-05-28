import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Project columns contain cards of work.
     *
     * @title Project Column
    */
    export interface project_column {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.project_column[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Sort columns by last updated date (descending)
  const columns = [...value].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // Format ISO date-time into a user-friendly string
  const formatDateTime = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No project columns available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-3 truncate">
            {col.name}
          </h2>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span title={col.created_at}>
              Created: {formatDateTime(col.created_at)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Calendar size={16} className="mr-1" />
            <span title={col.updated_at}>
              Updated: {formatDateTime(col.updated_at)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
