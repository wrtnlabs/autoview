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
export type AutoViewInput = AutoViewInputSubTypes.project_column;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
      <div className="mt-2 space-y-1 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <span className="ml-1">Updated: {updatedDate}</span>
        </div>
      </div>
    </div>
  );
}
