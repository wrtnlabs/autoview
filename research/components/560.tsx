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
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const getDisplayUrl = (url: string): string => {
    try {
      const u = new URL(url);
      return u.host + u.pathname;
    } catch {
      return url;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span
            className="truncate"
            title={value.url}
          >
            {getDisplayUrl(value.url)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span
            className="truncate"
            title={value.project_url}
          >
            {getDisplayUrl(value.project_url)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>Created: {formattedCreated}</span>
        </div>

        <div className="flex items-center gap-1">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>
    </div>
  );
}
