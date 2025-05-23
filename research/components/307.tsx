import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface root {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.root;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Transform snake_case keys into human-readable labels and filter out any undefined URLs.
  const endpoints: { key: string; label: string; url: string }[] = Object.entries(value)
    .filter(([, url]) => typeof url === "string" && url.length > 0)
    .map(([key, url]) => {
      const label = key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { key, label, url: url as string };
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render a titled card with a scrollable list of API endpoints.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        API Endpoints
      </h2>
      <ul className="space-y-3">
        {endpoints.map((endpoint) => (
          <li
            key={endpoint.key}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <LucideReact.Link
              size={16}
              className="text-gray-400 flex-shrink-0 mt-0.5"
              aria-label="Endpoint URL"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800">
                {endpoint.label}
              </div>
              <code
                className="block font-mono text-indigo-600 truncate"
                title={endpoint.url}
              >
                {endpoint.url}
              </code>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
