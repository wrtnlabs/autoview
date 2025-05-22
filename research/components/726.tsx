import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.deployment_status[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateCounts: Record<string, number> = value.reduce((acc, status) => {
    acc[status.state] = (acc[status.state] || 0) + 1;
    return acc;
  }, {});

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      ", " +
      d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStateIcon = (
    state: AutoViewInputSubTypes.deployment_status["state"],
    props?: { size?: number; className?: string },
  ): JSX.Element => {
    const size = props?.size ?? 16;
    const base = props?.className ?? "";
    switch (state) {
      case "success":
        return (
          <LucideReact.CheckCircle
            size={size}
            className={base + " text-green-500"}
          />
        );
      case "error":
      case "failure":
        return (
          <LucideReact.AlertTriangle
            size={size}
            className={base + " text-red-500"}
          />
        );
      case "pending":
      case "queued":
        return (
          <LucideReact.Clock size={size} className={base + " text-amber-500"} />
        );
      case "in_progress":
        return (
          <LucideReact.Loader
            size={size}
            className={base + " animate-spin text-blue-500"}
          />
        );
      case "inactive":
      default:
        return (
          <LucideReact.Circle size={size} className={base + " text-gray-400"} />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No deployment statuses available</span>
        </div>
      ) : (
        <>
          {/* Summary of states */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {Object.entries(stateCounts).map(([state, count]) => (
              <div
                key={state}
                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium"
              >
                {getStateIcon(state as any, { size: 14 })}
                <span className="capitalize">{state.replace("_", " ")}</span>
                <span className="text-gray-600">×{count}</span>
              </div>
            ))}
          </div>

          {/* Detailed list */}
          <div className="space-y-4">
            {value.map((status) => (
              <div
                key={status.id}
                className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0">
                  {getStateIcon(status.state, {
                    size: 24,
                    className: "flex-shrink-0",
                  })}
                </div>
                <div className="flex-1 mt-3 md:mt-0 md:ml-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      {status.creator ? (
                        <img
                          src={status.creator.avatar_url}
                          alt={`${status.creator.login}'s avatar`}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            const tgt = e.currentTarget;
                            tgt.onerror = null;
                            tgt.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              status.creator?.login || "",
                            )}&background=0D8ABC&color=fff`;
                          }}
                        />
                      ) : (
                        <LucideReact.User size={20} className="text-gray-400" />
                      )}
                      <span className="font-medium text-gray-800">
                        {status.creator?.login || "Unknown User"}
                      </span>
                      {status.environment ? (
                        <span className="ml-2 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">
                          {status.environment}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-2 md:mt-0">
                      <LucideReact.Calendar size={16} className="mr-1" />
                      {formatDate(status.created_at)}
                    </div>
                  </div>

                  {status.description ? (
                    <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                      {status.description}
                    </p>
                  ) : null}

                  {status.target_url ? (
                    <div className="mt-2 flex items-center text-gray-500 text-sm">
                      <LucideReact.Link size={16} className="mr-1" />
                      <span className="truncate">{status.target_url}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
