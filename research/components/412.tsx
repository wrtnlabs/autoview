import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for GitHub Actions for an organization.
     *
     * @title Actions Secret for an Organization
    */
    export interface organization_actions_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Visibility of a secret
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_actions_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let visibilityIcon: React.ReactNode = null;
  let visibilityText = '';
  let visibilityColor = '';

  switch (value.visibility) {
    case 'all':
      visibilityIcon = <LucideReact.Globe size={16} className="text-blue-500" />;
      visibilityText = 'All repositories';
      visibilityColor = 'text-blue-500';
      break;
    case 'private':
      visibilityIcon = <LucideReact.Lock size={16} className="text-red-500" />;
      visibilityText = 'Private';
      visibilityColor = 'text-red-500';
      break;
    case 'selected':
      visibilityIcon = <LucideReact.List size={16} className="text-yellow-500" />;
      visibilityText = 'Selected repositories';
      visibilityColor = 'text-yellow-500';
      break;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          {visibilityIcon}
          <span className={`font-medium ${visibilityColor}`}>{visibilityText}</span>
        </div>
        {value.visibility === 'selected' && value.selected_repositories_url && (
          <div className="flex items-start gap-1">
            <LucideReact.Link size={16} className="text-gray-400 mt-[2px]" />
            <span className="text-gray-700 text-sm break-all">
              {value.selected_repositories_url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
