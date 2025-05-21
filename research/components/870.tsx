import React from "react";
export namespace AutoViewInputSubTypes {
    export type secret_scanning_location = {
        /**
         * The location type. Because secrets may be found in different types of resources (ie. code, comments, issues, pull requests, discussions), this field identifies the type of resource where the secret was found.
        */
        type?: "commit" | "wiki_commit" | "issue_title" | "issue_body" | "issue_comment" | "discussion_title" | "discussion_body" | "discussion_comment" | "pull_request_title" | "pull_request_body" | "pull_request_comment" | "pull_request_review" | "pull_request_review_comment";
        details?: any | any | any | any | any | any | any | any | any | any | any | any | any;
    };
    export type secret_scanning_location_commit = any;
    export type secret_scanning_location_wiki_commit = any;
    export type secret_scanning_location_issue_title = any;
    export type secret_scanning_location_issue_body = any;
    export type secret_scanning_location_issue_comment = any;
    export type secret_scanning_location_discussion_title = any;
    export type secret_scanning_location_discussion_body = any;
    export type secret_scanning_location_discussion_comment = any;
    export type secret_scanning_location_pull_request_title = any;
    export type secret_scanning_location_pull_request_body = any;
    export type secret_scanning_location_pull_request_comment = any;
    export type secret_scanning_location_pull_request_review = any;
    export type secret_scanning_location_pull_request_review_comment = any;
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_location[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Map each location type to a human-readable label
  const TYPE_LABELS: Record<string, string> = {
    commit: "Commit",
    wiki_commit: "Wiki Commit",
    issue_title: "Issue Title",
    issue_body: "Issue Body",
    issue_comment: "Issue Comment",
    discussion_title: "Discussion Title",
    discussion_body: "Discussion Body",
    discussion_comment: "Discussion Comment",
    pull_request_title: "Pull Request Title",
    pull_request_body: "Pull Request Body",
    pull_request_comment: "Pull Request Comment",
    pull_request_review: "Pull Request Review",
    pull_request_review_comment: "Pull Request Review Comment",
  };

  // Safely stringify details, truncated for display
  function getDetailSnippet(details: any): string {
    try {
      const json = JSON.stringify(details, null, 2);
      // Limit snippet length to ~200 characters
      return json.length > 200 ? json.slice(0, 200) + "… " : json;
    } catch {
      return String(details);
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const locations = Array.isArray(value) ? value : [];

  if (locations.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
        No secret scanning locations found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {locations.map((loc, idx) => {
        const rawType = loc.type || "unknown";
        const label = TYPE_LABELS[rawType] || rawType.replace(/_/g, " ");
        const snippet = getDetailSnippet(loc.details);
        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                {label}
              </span>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {rawType}
              </span>
            </div>
            <pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-600 line-clamp-3">
              {snippet}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
