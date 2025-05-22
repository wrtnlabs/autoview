import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsSecrets {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      secrets: AutoViewInputSubTypes.organization_actions_secret[];
    };
  }
  /**
   * Secrets for GitHub Actions for an organization.
   *
   * @title Actions Secret for an Organization
   */
  export type organization_actions_secret = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const visibilityConfig: Record<
    AutoViewInputSubTypes.organization_actions_secret["visibility"],
    { label: string; icon: JSX.Element; badgeColor: string }
  > = {
    all: {
      label: "All repositories",
      icon: <LucideReact.Users size={16} className="text-blue-500" />,
      badgeColor: "bg-blue-100 text-blue-800",
    },
    private: {
      label: "Private",
      icon: <LucideReact.Lock size={16} className="text-red-500" />,
      badgeColor: "bg-red-100 text-red-800",
    },
    selected: {
      label: "Selected repositories",
      icon: <LucideReact.ListChecks size={16} className="text-green-500" />,
      badgeColor: "bg-green-100 text-green-800",
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Organization Secrets ({value.total_count})
        </h2>
      </div>

      {value.secrets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.secrets.map((secret) => {
            const cfg = visibilityConfig[secret.visibility];
            return (
              <li
                key={secret.name}
                className="p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <LucideReact.Key size={20} className="text-gray-700 mr-2" />
                    <span className="font-medium text-gray-800 truncate">
                      {secret.name}
                    </span>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 inline-flex items-center px-2 py-1 text-xs font-medium rounded ${cfg.badgeColor}`}
                  >
                    {cfg.icon}
                    <span className="ml-1">{cfg.label}</span>
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>Created: {formatDateTime(secret.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>Updated: {formatDateTime(secret.updated_at)}</span>
                  </div>
                  {secret.visibility === "selected" &&
                    secret.selected_repositories_url && (
                      <div className="flex items-center sm:col-span-2">
                        <LucideReact.Link size={16} className="mr-1" />
                        <span className="truncate">
                          {secret.selected_repositories_url}
                        </span>
                      </div>
                    )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
