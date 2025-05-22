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
  const createdAtDate = new Date(value.created_at);
  const updatedAtDate = new Date(value.updated_at);

  const formattedCreatedAt = createdAtDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedUpdatedAt = updatedAtDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full sm:max-w-sm">
      <div className="flex items-center mb-3">
        <LucideReact.Columns
          size={20}
          className="text-gray-600 mr-2"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <div className="flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Created at"
          />
          <time dateTime={value.created_at}>{formattedCreatedAt}</time>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Last updated at"
          />
          <time dateTime={value.updated_at}>{formattedUpdatedAt}</time>
        </div>
      </div>
    </div>
  );
}
