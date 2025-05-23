import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Set repository secrets for GitHub Codespaces.
     *
     * @title Codespaces Secret
    */
    export interface repo_codespaces_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.repo_codespaces_secret;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedUpdatedAt = updatedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-blue-500" aria-hidden="true" />
        <h2
          className="ml-2 text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <LucideReact.Calendar size={16} className="flex-shrink-0" aria-hidden="true" />
        <span className="ml-1">Created: {formattedCreatedAt}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Clock size={16} className="flex-shrink-0" aria-hidden="true" />
        <span className="ml-1">Updated: {formattedUpdatedAt}</span>
      </div>
    </div>
  );
}
