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
  // 1. Data preparation and utility functions
  const integrations = value.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const encode = (str: string) => encodeURIComponent(str);

  // 2. Handle empty state
  if (integrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No integrations available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((item) => {
        // Determine owner type and avatar
        const owner = item.owner;
        const isUser = "login" in owner;
        const ownerName = isUser ? owner.login : owner.name;
        const defaultAvatar = isUser
          ? `https://ui-avatars.com/api/?name=${encode(ownerName)}&background=random&color=fff`
          : `https://placehold.co/100x100/e2e8f0/475569?text=${encode(item.name)}`;
        const avatarUrl = owner.avatar_url || defaultAvatar;

        return (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
          >
            {/* Header: Name & Slug */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                {item.slug && (
                  <span className="text-sm text-gray-500 truncate">
                    {item.slug}
                  </span>
                )}
              </div>
              {/* Description */}
              {item.description && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>

            {/* Owner info */}
            <div className="flex items-center mt-4 space-x-3">
              <img
                src={avatarUrl}
                alt={ownerName}
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700 truncate">
                {ownerName}
              </span>
            </div>

            {/* Metadata & Actions */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Created {formatDate(item.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={14} />
                <span>Updated {formatDate(item.updated_at)}</span>
              </div>
              {item.installations_count != null && (
                <div className="flex items-center gap-1">
                  <LucideReact.Users size={14} />
                  <span>{item.installations_count} installs</span>
                </div>
              )}
              {item.permissions && (
                <div className="flex items-center gap-1">
                  <LucideReact.Key size={14} />
                  <span>
                    {Object.keys(item.permissions).length} permissions
                  </span>
                </div>
              )}
              {item.events?.length > 0 && (
                <div className="flex items-center gap-1">
                  <LucideReact.Activity size={14} />
                  <span>{item.events.length} events</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <LucideReact.Link size={14} />
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
