import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type root = {
    current_user_url: string & tags.Format<"uri-template">;
    current_user_authorizations_html_url: string & tags.Format<"uri-template">;
    authorizations_url: string & tags.Format<"uri-template">;
    code_search_url: string & tags.Format<"uri-template">;
    commit_search_url: string & tags.Format<"uri-template">;
    emails_url: string & tags.Format<"uri-template">;
    emojis_url: string & tags.Format<"uri-template">;
    events_url: string & tags.Format<"uri-template">;
    feeds_url: string & tags.Format<"uri-template">;
    followers_url: string & tags.Format<"uri-template">;
    following_url: string & tags.Format<"uri-template">;
    gists_url: string & tags.Format<"uri-template">;
    /**
     * @deprecated
     */
    hub_url?: string & tags.Format<"uri-template">;
    issue_search_url: string & tags.Format<"uri-template">;
    issues_url: string & tags.Format<"uri-template">;
    keys_url: string & tags.Format<"uri-template">;
    label_search_url: string & tags.Format<"uri-template">;
    notifications_url: string & tags.Format<"uri-template">;
    organization_url: string & tags.Format<"uri-template">;
    organization_repositories_url: string & tags.Format<"uri-template">;
    organization_teams_url: string & tags.Format<"uri-template">;
    public_gists_url: string & tags.Format<"uri-template">;
    rate_limit_url: string & tags.Format<"uri-template">;
    repository_url: string & tags.Format<"uri-template">;
    repository_search_url: string & tags.Format<"uri-template">;
    current_user_repositories_url: string & tags.Format<"uri-template">;
    starred_url: string & tags.Format<"uri-template">;
    starred_gists_url: string & tags.Format<"uri-template">;
    topic_search_url?: string & tags.Format<"uri-template">;
    user_url: string & tags.Format<"uri-template">;
    user_organizations_url: string & tags.Format<"uri-template">;
    user_repositories_url: string & tags.Format<"uri-template">;
    user_search_url: string & tags.Format<"uri-template">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.root;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const endpoints = Object.entries(value)
    // Filter out optional undefined and deprecated entries
    .filter(([_, url]) => typeof url === "string")
    .map(([key, url]) => ({ key, url: url as string }));

  const formatLabel = (key: string): string =>
    key
      .replace(/_url$/i, "")
      .split(/[_\-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-[80vh] overflow-auto">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.Link className="mr-2 text-blue-500" size={20} />
        GitHub API Endpoints
      </h2>
      <div className="space-y-4">
        {endpoints.map(({ key, url }) => (
          <div key={key} className="flex items-start gap-3">
            <LucideReact.Link className="mt-1 text-gray-400" size={16} />
            <div className="flex-1">
              <div className="text-gray-700 font-medium">
                {formatLabel(key)}
              </div>
              <div className="mt-1 text-sm text-blue-600 font-mono break-all">
                {url}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
