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
export type AutoViewInput = AutoViewInputSubTypes.project_column;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const createdAt = formatDateTime(value.created_at);
  const updatedAt = formatDateTime(value.updated_at);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
      <h2
        className="text-lg font-semibold text-gray-900 mb-3 truncate"
        title={value.name}
      >
        {value.name}
      </h2>

      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.Calendar
            className="mr-1 flex-shrink-0"
            size={16}
            aria-label="Created date"
          />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.Calendar
            className="mr-1 flex-shrink-0"
            size={16}
            aria-label="Updated date"
          />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start text-gray-700">
          <LucideReact.Link
            className="mt-1 mr-1 text-gray-400 flex-shrink-0"
            size={16}
            aria-label="Column URL"
          />
          <span className="break-all">{value.url}</span>
        </div>
        <div className="flex items-start text-gray-700">
          <LucideReact.Link
            className="mt-1 mr-1 text-gray-400 flex-shrink-0"
            size={16}
            aria-label="Project URL"
          />
          <span className="break-all">{value.project_url}</span>
        </div>
        <div className="flex items-start text-gray-700">
          <LucideReact.Link
            className="mt-1 mr-1 text-gray-400 flex-shrink-0"
            size={16}
            aria-label="Cards URL"
          />
          <span className="break-all">{value.cards_url}</span>
        </div>
      </div>
    </div>
  );
}
