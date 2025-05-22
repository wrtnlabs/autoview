import * as LucideReact from "lucide-react";
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
  // 1. Data transformations and helpers
  const apps = (Array.isArray(value) ? value : []).filter(
    (app): app is NonNullable<typeof app> => app !== null,
  );
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No GitHub Apps available</span>
      </div>
    );
  }

  // 2. Compose the visual structure
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => {
        const owner = app.owner;
        const isUser = (owner as any).login !== undefined;
        const ownerName = isUser
          ? (owner as AutoViewInputSubTypes.simple_user).name ||
            (owner as AutoViewInputSubTypes.simple_user).login
          : (owner as AutoViewInputSubTypes.enterprise).name;
        const ownerType = isUser ? "User" : "Enterprise";
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          ownerName,
        )}&background=random`;
        const desc = app.description?.trim() || "No description provided";
        const shortDesc = desc.length > 120 ? desc.slice(0, 120) + "…" : desc;
        const permCount = Object.keys(app.permissions || {}).length;
        const eventCount = Array.isArray(app.events) ? app.events.length : 0;

        return (
          <div
            key={app.id}
            className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Owner Info */}
            <div className="flex items-center p-4 border-b border-gray-100">
              <img
                src={owner.avatar_url}
                alt={ownerName}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatarFallback;
                }}
              />
              <div className="ml-3">
                <div className="flex items-center text-sm font-medium text-gray-700 space-x-1">
                  {isUser ? (
                    <LucideReact.User size={16} className="text-gray-500" />
                  ) : (
                    <LucideReact.Building size={16} className="text-gray-500" />
                  )}
                  <span>{ownerName}</span>
                </div>
                <div className="text-xs text-gray-400">{ownerType}</div>
              </div>
            </div>

            {/* App Title & Description */}
            <div className="flex-1 p-4 flex flex-col">
              <a
                href={app.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 font-semibold hover:underline text-lg"
              >
                <LucideReact.Link size={16} className="mr-1" />
                {app.name}
              </a>
              <p className="mt-2 text-gray-600 text-sm overflow-hidden line-clamp-3">
                {shortDesc}
              </p>
            </div>

            {/* Stats */}
            <div className="p-4 border-t border-gray-100 text-gray-500 text-xs flex flex-wrap gap-3">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>{formatDate(app.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>{formatDate(app.updated_at)}</span>
              </div>
              {typeof app.installations_count === "number" && (
                <div className="flex items-center">
                  <LucideReact.Users size={14} className="mr-1" />
                  <span>{app.installations_count} installations</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.Key size={14} className="mr-1" />
                <span>{permCount} permissions</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Bell size={14} className="mr-1" />
                <span>{eventCount} events</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
