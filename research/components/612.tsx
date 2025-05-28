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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm w-full">
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-gray-600" aria-hidden="true" />
        <h3 className="text-lg font-medium text-gray-800 truncate">{value.name}</h3>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-400" aria-hidden="true" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <LucideReact.Clock size={16} className="mr-1 text-gray-400" aria-hidden="true" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>
    </div>
  );
}
