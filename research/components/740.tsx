import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsSecrets {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const { total_count, secrets } = value;
  const formattedTotal = total_count.toLocaleString();

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-lg font-semibold text-gray-700">
          <LucideReact.Lock className="mr-2 text-gray-500" size={20} aria-hidden="true" />
          <span>Secrets</span>
        </div>
        <div className="flex items-center text-gray-500">
          <LucideReact.Database className="mr-1" size={16} aria-hidden="true" />
          <span>{formattedTotal}</span>
        </div>
      </div>

      {/* Body */}
      {secrets.length === 0 ? (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle className="mr-2" size={24} aria-hidden="true" />
          <span>No secrets available.</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {secrets.map((secret) => (
            <li key={secret.name} className="py-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                {/* Name */}
                <div className="flex items-center text-gray-800">
                  <LucideReact.Key className="mr-2 text-gray-500" size={16} aria-hidden="true" />
                  <span className="font-medium truncate">{secret.name}</span>
                </div>
                {/* Dates */}
                <div className="flex items-center text-sm text-gray-500 mt-1 sm:mt-0 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar className="mr-1" size={14} aria-hidden="true" />
                    <span className="truncate">{formatDate(secret.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.RefreshCcw className="mr-1" size={14} aria-hidden="true" />
                    <span className="truncate">{formatDate(secret.updated_at)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
