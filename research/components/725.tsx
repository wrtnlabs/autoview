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
export type AutoViewInput = AutoViewInputSubTypes.deployment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.sha.slice(0, 7);
  const isProduction = Boolean(value.production_environment);
  const isTransient = Boolean(value.transient_environment);
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const descriptionText = value.description ?? "";
  const truncatedDescription =
    descriptionText.length > 120
      ? descriptionText.slice(0, 120) + "..."
      : descriptionText;
  const creator = value.creator;
  const avatarUrl =
    creator?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creator?.login ?? "User",
    )}&background=random`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Environment Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {value.environment}
          </span>
        </div>
        {isProduction ? (
          <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            Production
          </span>
        ) : isTransient ? (
          <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            Transient
          </span>
        ) : null}
      </div>

      {/* Ref and SHA */}
      <div className="mt-2">
        <div className="text-lg font-semibold text-gray-800 truncate">
          {value.ref}
        </div>
        <div className="text-xs text-gray-500">#{shortSha}</div>
      </div>

      {/* Description */}
      {truncatedDescription && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {truncatedDescription}
        </p>
      )}

      {/* Creator Info */}
      <div className="flex items-center mt-4">
        <img
          src={avatarUrl}
          alt={creator?.login ? `${creator.login}'s avatar` : "Avatar"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="ml-2 text-sm font-medium text-gray-700">
          {creator?.login ?? "Unknown"}
        </span>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap items-center mt-3 text-xs text-gray-500 gap-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={14} />
          <span className="ml-1">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Edit3 size={14} />
          <span className="ml-1">Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Repository Link */}
      <div className="flex items-center mt-3 text-sm">
        <LucideReact.Link size={16} className="text-indigo-500" />
        <a
          href={value.repository_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-indigo-600 hover:underline truncate"
        >
          {value.repository_url}
        </a>
      </div>
    </div>
  );
}
