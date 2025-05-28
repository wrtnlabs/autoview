import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.actions_secret[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const secrets = value.secrets;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.Key size={20} className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Actions Secrets</h2>
        </div>
        <div className="flex items-center text-gray-600">
          <LucideReact.Hash size={16} className="mr-1" />
          <span className="text-sm">{totalCount}</span>
        </div>
      </div>

      {/* Secrets list */}
      <ul className="space-y-3">
        {secrets.map((secret) => (
          <li key={secret.name} className="p-3 hover:bg-gray-50 rounded-md">
            <div className="flex items-center mb-1">
              <LucideReact.Lock size={16} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800 truncate">{secret.name}</span>
            </div>
            <div className="text-xs text-gray-500 flex space-x-4">
              <div className="flex items-center">
                <LucideReact.Calendar size={12} className="mr-1" />
                <span>Created: {formatDate(secret.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock size={12} className="mr-1" />
                <span>Updated: {formatDate(secret.updated_at)}</span>
              </div>
            </div>
          </li>
        ))}

        {secrets.length === 0 && (
          <li className="flex flex-col items-center text-gray-400 py-6">
            <LucideReact.AlertCircle size={24} className="mb-2" />
            <span>No secrets available</span>
          </li>
        )}
      </ul>
    </div>
  );
}
