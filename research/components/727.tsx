import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The status of a deployment.
   *
   * @title Deployment Status
   */
  export type deployment_status = {
    url: string & tags.Format<"uri">;
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The state of the status.
     */
    state:
      | "error"
      | "failure"
      | "inactive"
      | "pending"
      | "success"
      | "queued"
      | "in_progress";
    creator: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * A short description of the status.
     */
    description: string & tags.Default<"">;
    /**
     * The environment of the deployment that the status is for.
     */
    environment?: string & tags.Default<"">;
    /**
     * Closing down notice: the URL to associate with this status.
     */
    target_url: string & tags.Default<"">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    deployment_url: string & tags.Format<"uri">;
    repository_url: string & tags.Format<"uri">;
    /**
     * The URL for accessing your environment.
     */
    environment_url?: string & tags.Default<"">;
    /**
     * The URL to associate with this status.
     */
    log_url?: string & tags.Default<"">;
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const state = value.state;
  let StateIcon = LucideReact.CheckCircle;
  let stateColor = "text-green-500";

  switch (state) {
    case "success":
      StateIcon = LucideReact.CheckCircle;
      stateColor = "text-green-500";
      break;
    case "failure":
    case "error":
      StateIcon = LucideReact.AlertTriangle;
      stateColor = "text-red-500";
      break;
    case "pending":
    case "queued":
      StateIcon = LucideReact.Clock;
      stateColor = "text-amber-500";
      break;
    case "in_progress":
      StateIcon = LucideReact.Loader;
      stateColor = "text-blue-500 animate-spin";
      break;
    case "inactive":
      StateIcon = LucideReact.XCircle;
      stateColor = "text-gray-500";
      break;
    default:
      StateIcon = LucideReact.HelpCircle;
      stateColor = "text-gray-400";
  }

  const formattedCreated = new Date(value.created_at).toLocaleString();
  const formattedUpdated = new Date(value.updated_at).toLocaleString();
  const repoName =
    value.repository_url.split("/").pop() || value.repository_url;
  const descriptionText =
    value.description && value.description.trim().length > 0
      ? value.description
      : state.charAt(0).toUpperCase() + state.slice(1);

  const targetHost = value.target_url
    ? (() => {
        try {
          return new URL(value.target_url).host;
        } catch {
          return value.target_url;
        }
      })()
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: State */}
      <div className="flex items-center gap-2">
        <StateIcon className={`${stateColor}`} size={20} strokeWidth={2} />
        <h2 className="text-lg font-semibold capitalize">{state}</h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-2 line-clamp-2">{descriptionText}</p>

      {/* Labels: Environment & Integration */}
      <div className="flex flex-wrap gap-2 mt-3">
        {value.environment && (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
            {value.environment}
          </span>
        )}
        {value.performed_via_github_app && (
          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
            {value.performed_via_github_app.name}
          </span>
        )}
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-500">
        {/* Created */}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        {/* Updated */}
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCcw size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
        {/* Repository */}
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} />
          <span>{repoName}</span>
        </div>
        {/* Target URL */}
        {targetHost && (
          <div className="flex items-center gap-1">
            <LucideReact.Link size={16} />
            <span className="truncate">{targetHost}</span>
          </div>
        )}
        {/* Creator */}
        {value.creator && (
          <div className="flex items-center gap-2">
            <img
              src={value.creator.avatar_url}
              alt={value.creator.login}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.creator?.login || "User",
                )}&background=ddd&color=444`;
              }}
            />
            <span>{value.creator.login}</span>
          </div>
        )}
      </div>
    </section>
  );
}
