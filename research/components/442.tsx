import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsDependabotSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.organization_dependabot_secret[];
        }
    }
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export interface organization_dependabot_secret {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsDependabotSecrets.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and formatting
  const { total_count, secrets } = value;
  const visibilityCounts = secrets.reduce(
    (acc, s) => {
      if (s.visibility === "all") acc.all += 1;
      else if (s.visibility === "private") acc.private += 1;
      else if (s.visibility === "selected") acc.selected += 1;
      return acc;
    },
    { all: 0, private: 0, selected: 0 }
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="flex items-center mb-6">
        <LucideReact.Key size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Dependabot Secrets ({total_count})
        </h2>
      </div>

      {/* Visibility Breakdown */}
      <div className="flex items-center space-x-6 mb-6 text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Globe size={16} className="text-gray-400" />
          <span>All: {visibilityCounts.all}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Lock size={16} className="text-gray-400" />
          <span>Private: {visibilityCounts.private}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span>Selected: {visibilityCounts.selected}</span>
        </div>
      </div>

      {/* Secrets List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {secrets.map((secret) => (
          <div
            key={secret.name}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Name & Visibility */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 truncate">
                {secret.name}
              </span>
              <div className="flex items-center">
                {secret.visibility === "all" && (
                  <LucideReact.Globe size={16} className="text-blue-500" />
                )}
                {secret.visibility === "private" && (
                  <LucideReact.Lock size={16} className="text-red-500" />
                )}
                {secret.visibility === "selected" && (
                  <LucideReact.Link size={16} className="text-green-500" />
                )}
              </div>
            </div>

            {/* Dates and Optional URL */}
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} className="text-gray-400" />
                <span>Created: {formatDate(secret.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Edit2 size={14} className="text-gray-400" />
                <span>Updated: {formatDate(secret.updated_at)}</span>
              </div>
              {secret.visibility === "selected" && secret.selected_repositories_url && (
                <div className="flex items-center gap-1">
                  <LucideReact.Link size={14} className="text-gray-400" />
                  <span className="truncate">{secret.selected_repositories_url}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Empty state */}
        {secrets.length === 0 && (
          <div className="col-span-full flex flex-col items-center py-8 text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <p className="mt-2">No secrets available</p>
          </div>
        )}
      </div>
    </div>
  );
}
