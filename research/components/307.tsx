import { tags } from "typia";
import React from "react";
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
  const endpointEntries = (Object.keys(value) as Array<keyof AutoViewInput>)
    .map((key) => {
      const url = (value as any)[key] as string | undefined;
      if (!url) return null;
      // Humanize the key: replace underscores with spaces and capitalize words
      const label = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      // Mark deprecated endpoints
      const deprecated = key === 'hub_url';
      return { key, label, url, deprecated };
    })
    .filter((item): item is { key: keyof AutoViewInput; label: string; url: string; deprecated: boolean } => item !== null);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        GitHub API Root Endpoints
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {endpointEntries.map(({ key, label, url, deprecated }) => (
          <div key={key} className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              {deprecated && (
                <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                  Deprecated
                </span>
              )}
            </div>
            <a
              href={url}
              className="text-sm text-blue-600 truncate hover:underline"
              title={url}
            >
              {url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
