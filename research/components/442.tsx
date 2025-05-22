import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsDependabotSecrets {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      secrets: AutoViewInputSubTypes.organization_dependabot_secret[];
    };
  }
  /**
   * Secrets for GitHub Dependabot for an organization.
   *
   * @title Dependabot Secret for an Organization
   */
  export type organization_dependabot_secret = {
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
  AutoViewInputSubTypes.IApiOrgsDependabotSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;
  const visibilityMap: Record<
    AutoViewInputSubTypes.organization_dependabot_secret["visibility"],
    { icon: JSX.Element; label: string; colorClass: string }
  > = {
    all: {
      icon: <LucideReact.Users size={16} className="text-blue-500" />,
      label: "All repositories",
      colorClass: "text-blue-500",
    },
    private: {
      icon: <LucideReact.Lock size={16} className="text-red-500" />,
      label: "Private only",
      colorClass: "text-red-500",
    },
    selected: {
      icon: <LucideReact.Tag size={16} className="text-green-500" />,
      label: "Selected repositories",
      colorClass: "text-green-500",
    },
  };

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Dependabot Secrets
          <span className="ml-1 text-sm text-gray-500">({total_count})</span>
        </h2>
      </div>

      {secrets.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle className="mr-2" size={20} />
          <span>No secrets available.</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {secrets.map((secret) => (
            <li
              key={secret.name}
              className="p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <LucideReact.Key
                    size={16}
                    className="text-indigo-500"
                    strokeWidth={1.5}
                  />
                  <span className="ml-2 font-medium text-gray-800 truncate">
                    {secret.name}
                  </span>
                </div>
                <div className="flex items-center">
                  {visibilityMap[secret.visibility].icon}
                  <span
                    className={`ml-1 text-sm ${visibilityMap[secret.visibility].colorClass}`}
                  >
                    {visibilityMap[secret.visibility].label}
                  </span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm">
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
                  <span className="ml-1">
                    Created: {formatDate(secret.created_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="text-gray-400" />
                  <span className="ml-1">
                    Updated: {formatDate(secret.updated_at)}
                  </span>
                </div>
                {secret.visibility === "selected" &&
                  secret.selected_repositories_url && (
                    <div className="col-span-1 sm:col-span-2 flex items-start">
                      <LucideReact.Link
                        size={14}
                        className="text-gray-400 mt-1"
                      />
                      <span className="ml-1 text-gray-700 text-sm">
                        Repos URL:{" "}
                        <span className="text-indigo-600 truncate break-all">
                          {secret.selected_repositories_url}
                        </span>
                      </span>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
