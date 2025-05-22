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
  // 1. Handle null or missing data
  if (!value) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-sm">No integration data available.</p>
      </div>
    );
  }

  // 2. Derive constants and formatted values
  const isSimpleUser = (
    owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise,
  ): owner is AutoViewInputSubTypes.simple_user => "login" in owner;

  const owner = value.owner;
  const ownerName = isSimpleUser(owner)
    ? (owner.name ?? owner.login)
    : owner.name;
  const ownerAvatar = owner.avatar_url;
  const ownerLabel = isSimpleUser(owner)
    ? owner.login
    : (owner as AutoViewInputSubTypes.enterprise).slug;
  const description = value.description ?? "No description provided.";
  const formattedCreatedAt = new Date(value.created_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );
  const permissionKeys = Object.keys(value.permissions);
  const eventsList = value.events;

  // 3. Compose the visual structure
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 text-gray-800">
      {/* Header: Name, slug and installation count */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          {value.slug && (
            <p className="text-sm text-gray-500 truncate">/{value.slug}</p>
          )}
        </div>
        {typeof value.installations_count === "number" && (
          <div className="flex items-center text-gray-600 ml-4">
            <LucideReact.Users className="mr-1" size={16} />
            <span className="text-sm">{value.installations_count}</span>
          </div>
        )}
      </div>

      {/* Owner */}
      <div className="flex items-center mt-4">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              ownerName,
            )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-gray-900 truncate">
            {ownerName}
          </p>
          <div className="flex items-center text-xs text-gray-500 truncate">
            {isSimpleUser(owner) ? (
              <LucideReact.User className="mr-1" size={12} />
            ) : (
              <LucideReact.Building className="mr-1" size={12} />
            )}
            <span className="truncate">{ownerLabel}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-4 line-clamp-3">{description}</p>

      {/* Links and Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center truncate">
          <LucideReact.Calendar className="mr-2 flex-shrink-0" size={16} />
          <span className="truncate">Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center truncate">
          <LucideReact.Calendar className="mr-2 flex-shrink-0" size={16} />
          <span className="truncate">Updated: {formattedUpdatedAt}</span>
        </div>
        {value.external_url && (
          <div className="flex items-center truncate">
            <LucideReact.Link className="mr-2 flex-shrink-0" size={16} />
            <span className="truncate">{value.external_url}</span>
          </div>
        )}
        {value.html_url && (
          <div className="flex items-center truncate">
            <LucideReact.Link className="mr-2 flex-shrink-0" size={16} />
            <span className="truncate">GitHub: {value.html_url}</span>
          </div>
        )}
      </div>

      {/* Permissions */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
        {permissionKeys.length === 0 ? (
          <p className="text-xs text-gray-500">No permissions configured.</p>
        ) : permissionKeys.length <= 5 ? (
          <div className="flex flex-wrap gap-2">
            {permissionKeys.map((key) => (
              <span
                key={key}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {key}: {value.permissions[key]}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            {permissionKeys.length} permissions configured
          </p>
        )}
      </div>

      {/* Events */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Events</h3>
        {eventsList.length === 0 ? (
          <p className="text-xs text-gray-500">No events subscribed.</p>
        ) : eventsList.length <= 5 ? (
          <div className="flex flex-wrap gap-2">
            {eventsList.map((evt) => (
              <span
                key={evt}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {evt}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-xs text-gray-500">
            <span className="truncate">
              {eventsList.slice(0, 5).join(", ")}
            </span>
            <span className="ml-1">+{eventsList.length - 5} more</span>
          </div>
        )}
      </div>
    </div>
  );
}
