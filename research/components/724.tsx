import * as LucideReact from "lucide-react";
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
  // 1. No additional aggregation needed beyond formatting dates and truncating SHA.

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No deployments available</span>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {value.map((deployment) => {
        const createdAt = new Date(deployment.created_at).toLocaleString();
        const shaShort = deployment.sha.slice(0, 7);
        const envLabel = deployment.environment;
        const isProd = deployment.production_environment === true;
        const isTransient = deployment.transient_environment === true;
        const creator = deployment.creator;

        // Placeholder avatar URL generator
        const placeholderAvatar = creator
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creator.login,
            )}&background=random`
          : "";

        return (
          <li
            key={deployment.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex items-start space-x-4">
              {creator ? (
                <img
                  src={creator.avatar_url}
                  alt={creator.login}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderAvatar;
                  }}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <LucideReact.User
                  size={48}
                  className="text-gray-300 flex-shrink-0"
                  aria-label="Unknown creator"
                />
              )}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {envLabel}
                </h3>
                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <LucideReact.GitBranch
                      size={16}
                      className="text-gray-400"
                    />
                    <span>{deployment.ref}</span>
                  </div>
                  <div className="flex items-center space-x-1 font-mono">
                    <LucideReact.Code size={16} className="text-gray-400" />
                    <span>{shaShort}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>{createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex-shrink-0 flex items-center space-x-4">
              {isProd && (
                <div className="flex items-center text-green-600 space-x-1">
                  <LucideReact.CheckCircle size={16} />
                  <span className="text-sm">Production</span>
                </div>
              )}
              {isTransient && (
                <div className="flex items-center text-yellow-600 space-x-1">
                  <LucideReact.AlertTriangle size={16} />
                  <span className="text-sm">Transient</span>
                </div>
              )}
            </div>

            {deployment.description && (
              <p className="mt-3 sm:mt-4 text-gray-700 text-sm line-clamp-2">
                {deployment.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
