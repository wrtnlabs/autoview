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
export type AutoViewInput = AutoViewInputSubTypes.integration;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  if (value === null) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
        <LucideReact.AlertCircle
          className="mx-auto mb-2 text-gray-400"
          size={48}
        />
        <p>No integration data available</p>
      </div>
    );
  }

  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const description = value.description ?? "No description provided";
  const truncatedDescription =
    description.length > 200 ? description.slice(0, 200) + "…" : description;

  const owner = value.owner;
  const isUser = owner && "login" in owner;
  const ownerName = isUser
    ? (owner as AutoViewInputSubTypes.simple_user).login
    : (owner as AutoViewInputSubTypes.enterprise).name;
  const ownerAvatar = (owner as any).avatar_url;
  const installCount = value.installations_count ?? 0;
  const permCount = Object.keys(value.permissions).length;
  const eventCount = value.events.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Name & Owner */}
      <div className="flex items-center space-x-4">
        {ownerAvatar && (
          <img
            src={ownerAvatar}
            alt={ownerName}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  ownerName,
                )}&background=ddd&color=555`;
            }}
          />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <LucideReact.Github size={20} />
            {value.name}
          </h2>
          <div className="inline-flex items-center text-sm text-gray-600 mt-1">
            {isUser ? (
              <LucideReact.User size={16} className="mr-1 text-gray-500" />
            ) : (
              <LucideReact.Building2 size={16} className="mr-1 text-gray-500" />
            )}
            <span>{ownerName}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-3">
        {truncatedDescription}
      </p>

      {/* Key Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.external_url}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Link size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.html_url}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-500" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1 text-gray-500" />
          <span>Updated: {updatedAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Key size={16} className="mr-1 text-gray-500" />
          <span>{permCount} Permissions</span>
        </div>
        <div className="flex items-center">
          <LucideReact.ListChecks size={16} className="mr-1 text-gray-500" />
          <span>{eventCount} Events</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1 text-gray-500" />
          <span>{installCount} Installations</span>
        </div>
      </div>
    </div>
  );
}
