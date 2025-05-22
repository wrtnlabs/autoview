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
  const stateInfoMap: Record<
    AutoViewInput["state"],
    { icon: keyof typeof LucideReact; color: string; label: string }
  > = {
    error: { icon: "AlertTriangle", color: "text-red-500", label: "Error" },
    failure: { icon: "XCircle", color: "text-red-500", label: "Failure" },
    inactive: { icon: "Slash", color: "text-gray-500", label: "Inactive" },
    pending: { icon: "Clock", color: "text-amber-500", label: "Pending" },
    success: { icon: "CheckCircle", color: "text-green-500", label: "Success" },
    queued: { icon: "Clock", color: "text-blue-500", label: "Queued" },
    in_progress: {
      icon: "Loader",
      color: "text-blue-500 animate-spin",
      label: "In Progress",
    },
  };
  const stateInfo = stateInfoMap[value.state];
  const StatusIcon = (LucideReact as any)[
    stateInfo.icon
  ] as React.ComponentType<any>;

  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const description = value.description?.trim() ?? "";
  const truncatedDescription =
    description.length > 120 ? description.slice(0, 120) + "…" : description;

  const creator = value.creator;
  const creatorName = creator?.name || creator?.login || "Unknown User";
  const avatarSrc = creator?.avatar_url;
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Status */}
      <div className="flex items-center mb-3">
        <StatusIcon size={20} className={stateInfo.color} />
        <span className="ml-2 text-lg font-semibold capitalize">
          {stateInfo.label}
        </span>
      </div>

      {/* Environment */}
      {value.environment && value.environment.trim() !== "" && (
        <div className="mb-3">
          <span className="text-sm text-gray-600">Environment:</span>
          <span className="ml-1 text-sm text-gray-800 capitalize">
            {value.environment}
          </span>
        </div>
      )}

      {/* Description */}
      {truncatedDescription && (
        <p className="mb-4 text-gray-700 text-sm line-clamp-3">
          {truncatedDescription}
        </p>
      )}

      {/* Creator, Created & Updated */}
      <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
        {creator ? (
          <div className="flex items-center">
            <img
              src={avatarSrc}
              alt={creatorName}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholderAvatar;
              }}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="ml-2">{creatorName}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <LucideReact.User size={16} className="text-gray-400" />
            <span className="ml-2">Unknown</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">{createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="ml-1">{updatedAt}</span>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2 text-sm">
        {[
          { label: "Repository", url: value.repository_url },
          { label: "Deployment", url: value.deployment_url },
          { label: "Target", url: value.target_url },
        ].map(
          (item) =>
            item.url && (
              <div
                key={item.label}
                className="flex items-center text-gray-600 truncate"
              >
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="ml-2 truncate">{item.url}</span>
              </div>
            ),
        )}
      </div>

      {/* Performed via GitHub App */}
      {value.performed_via_github_app?.name && (
        <div className="mt-4 text-sm text-gray-600">
          Performed via App:{" "}
          <span className="font-medium text-gray-800">
            {value.performed_via_github_app.name}
          </span>
        </div>
      )}
    </div>
  );
}
