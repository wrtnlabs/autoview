import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A request for a specific ref(branch,sha,tag) to be deployed
   *
   * @title Deployment
   */
  export type deployment = {
    url: string & tags.Format<"uri">;
    /**
     * Unique identifier of the deployment
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    sha: string;
    /**
     * The ref to deploy. This can be a branch, tag, or sha.
     */
    ref: string;
    /**
     * Parameter to specify a task to execute
     */
    task: string;
    payload: {} | string;
    original_environment?: string;
    /**
     * Name for the target deployment environment.
     */
    environment: string;
    description: string | null;
    creator: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    statuses_url: string & tags.Format<"uri">;
    repository_url: string & tags.Format<"uri">;
    /**
     * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
     */
    transient_environment?: boolean;
    /**
     * Specifies if the given environment is one that end-users directly interact with. Default: false.
     */
    production_environment?: boolean;
    performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
  } | null;
  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   *
   * @title GitHub app
   */
  export type nullable_integration = {
    /**
     * Unique identifier of the GitHub app
     */
    id: number & tags.Type<"int32">;
    /**
     * The slug name of the GitHub app
     */
    slug?: string;
    node_id: string;
    client_id?: string;
    owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
    /**
     * The name of the GitHub app
     */
    name: string;
    description: string | null;
    external_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * The set of permissions for the GitHub app
     */
    permissions: {
      [key: string]: string;
    };
    /**
     * The list of events for the GitHub app
     */
    events: string[];
    /**
     * The number of installations associated with the GitHub app
     */
    installations_count?: number & tags.Type<"int32">;
    client_secret?: string;
    webhook_secret?: string | null;
    pem?: string;
  } | null;
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
  };
  /**
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
    /**
     * A short description of the enterprise.
     */
    description?: string | null;
    html_url: string & tags.Format<"uri">;
    /**
     * The enterprise's website URL.
     */
    website_url?: (string & tags.Format<"uri">) | null;
    /**
     * Unique identifier of the enterprise
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the enterprise.
     */
    name: string;
    /**
     * The slug url identifier for the enterprise.
     */
    slug: string;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    avatar_url: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.deployment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const deployments = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (deployments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-lg">No deployments available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {deployments.map((d) => {
          const shortSha = d.sha.slice(0, 7);
          const creator = d.creator;
          const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            (creator?.name || creator?.login || "User").trim(),
          )}&background=0D8ABC&color=fff`;
          const avatarUrl = creator?.avatar_url || avatarPlaceholder;
          return (
            <div
              key={d.id}
              className="bg-white rounded-lg shadow p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {d.environment}
                </h3>
                <div className="flex gap-1">
                  {d.production_environment && (
                    <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded">
                      Production
                    </span>
                  )}
                  {d.transient_environment && !d.production_environment && (
                    <span className="px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded">
                      Transient
                    </span>
                  )}
                </div>
              </div>
              {/* Description */}
              {d.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {d.description}
                </p>
              )}
              {/* Details */}
              <ul className="mt-4 space-y-2 text-sm text-gray-700 flex-grow">
                <li className="flex items-center">
                  <LucideReact.GitBranch
                    size={16}
                    className="text-gray-500 mr-2"
                    aria-label="Ref"
                  />
                  <span className="truncate">{d.ref}</span>
                </li>
                <li className="flex items-center">
                  <LucideReact.Target
                    size={16}
                    className="text-gray-500 mr-2"
                    aria-label="Task"
                  />
                  <span className="truncate">{d.task}</span>
                </li>
                <li className="flex items-center">
                  <LucideReact.GitCommit
                    size={16}
                    className="text-gray-500 mr-2"
                    aria-label="Commit SHA"
                  />
                  <span className="font-mono">{shortSha}</span>
                </li>
                <li className="flex items-center">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-500 mr-2"
                    aria-label="Created at"
                  />
                  <span>{formatDate(d.created_at)}</span>
                </li>
                <li className="flex items-center">
                  <LucideReact.Link
                    size={16}
                    className="text-gray-500 mr-2"
                    aria-label="Repository"
                  />
                  <a
                    href={d.repository_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-blue-600 hover:underline"
                  >
                    Repo
                  </a>
                </li>
                {creator && (
                  <li className="flex items-center">
                    <img
                      src={avatarUrl}
                      alt={creator.login}
                      className="w-6 h-6 rounded-full mr-2 object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = avatarPlaceholder;
                      }}
                    />
                    <span className="truncate">{creator.login}</span>
                  </li>
                )}
              </ul>
              {/* Footer Link */}
              <div className="mt-4 flex justify-end">
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:underline text-sm"
                >
                  <LucideReact.ExternalLink className="mr-1" size={16} />
                  View
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
