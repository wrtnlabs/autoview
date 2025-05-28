import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Set secrets for GitHub Actions.
     *
     * @title Actions Secret
    */
    export interface actions_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-indigo-500 mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      </div>
      <div className="space-y-2 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" aria-hidden="true" />
          <span className="mr-1">Created:</span>
          <span className="font-medium">{formattedCreated}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={16} className="text-gray-400 mr-1" aria-hidden="true" />
          <span className="mr-1">Updated:</span>
          <span className="font-medium">{formattedUpdated}</span>
        </div>
      </div>
    </div>
  );
}
