import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   *
   * @title GitHub app
   */
  export type integration = {
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
export type AutoViewInput = AutoViewInputSubTypes.integration[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedIntegrations = [...value].sort(
    (a, b) => (b?.installations_count || 0) - (a?.installations_count || 0),
  );
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const getPermissionCount = (perms: Record<string, string>) =>
    Object.keys(perms).length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sortedIntegrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No integrations available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sortedIntegrations.map((integration, idx) => {
        if (!integration) return null;
        const {
          slug,
          name,
          description,
          external_url,
          html_url,
          created_at,
          updated_at,
          owner,
          events,
          permissions,
          installations_count,
        } = integration;
        const isUser = "login" in owner;
        const ownerName = isUser ? owner.login : owner.name;
        const ownerAvatar = owner.avatar_url;

        return (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-center mb-3">
              <img
                src={ownerAvatar}
                alt={ownerName}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    ownerName,
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {slug || ownerName}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {description || "No description"}
            </p>

            <div className="flex flex-wrap items-center text-gray-500 text-xs gap-2 mb-3">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>Created: {formatDate(created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Clock size={14} className="mr-1" />
                <span>Updated: {formatDate(updated_at)}</span>
              </div>
              {installations_count !== undefined && (
                <div className="flex items-center">
                  <LucideReact.Users size={14} className="mr-1" />
                  <span>{installations_count} Installs</span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-3 border-t border-gray-100 text-gray-500 text-sm flex flex-wrap gap-3">
              <a
                href={external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600"
              >
                <LucideReact.Link size={16} className="mr-1" />
                External
              </a>
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600"
              >
                <LucideReact.Code size={16} className="mr-1" />
                GitHub
              </a>
              <div className="flex items-center">
                <LucideReact.Key size={16} className="mr-1" />
                <span>{getPermissionCount(permissions)} perms</span>
              </div>
              <div className="flex items-center">
                <LucideReact.ListChecks size={16} className="mr-1" />
                <span>{events.length} events</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
