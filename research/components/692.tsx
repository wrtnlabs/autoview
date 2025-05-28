import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespacesSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.repo_codespaces_secret[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;

  // Format a date-time string into a human-readable format.
  const formatDateTime = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) + 
    ", " +
    d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      {/* Header with total count */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Lock size={20} className="mr-2 text-gray-500" />
        <h2 className="text-lg font-semibold">
          {total_count} {total_count === 1 ? "Secret" : "Secrets"}
        </h2>
      </div>

      {/* Empty state */}
      {secrets.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={36} className="mb-2" />
          <p>No secrets found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {secrets.map((secret: AutoViewInputSubTypes.repo_codespaces_secret) => (
            <li key={secret.name} className="py-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                {/* Secret name */}
                <div className="flex items-center mb-1 sm:mb-0">
                  <LucideReact.Key size={16} className="mr-2 text-gray-500" />
                  <span className="font-medium text-gray-900 truncate">
                    {secret.name}
                  </span>
                </div>
                {/* Creation & updated timestamps */}
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={14} className="mr-1" />
                    <time dateTime={secret.created_at}>
                      {formatDateTime(secret.created_at)}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.RefreshCcw size={14} className="mr-1" />
                    <time dateTime={secret.updated_at}>
                      {formatDateTime(secret.updated_at)}
                    </time>
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
