import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Request to install an integration on a target
   *
   * @title Integration Installation Request
   */
  export type integration_installation_request = {
    /**
     * Unique identifier of the request installation.
     */
    id: number & tags.Type<"int32">;
    node_id?: string;
    account:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.enterprise;
    requester: AutoViewInputSubTypes.simple_user;
    created_at: string & tags.Format<"date-time">;
  };
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
export type AutoViewInput =
  AutoViewInputSubTypes.integration_installation_request[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Type guard to distinguish simple users from enterprises
  const isSimpleUser = (
    account:
      | AutoViewInputSubTypes.simple_user
      | AutoViewInputSubTypes.enterprise,
  ): account is AutoViewInputSubTypes.simple_user => {
    return (account as AutoViewInputSubTypes.simple_user).login !== undefined;
  };

  // Helper to build a fallback avatar URL based on a name
  const avatarFallback = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  // Empty state if no requests provided
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No installation requests found.</span>
      </div>
    );
  }

  // Main render: a vertical list of request cards
  return (
    <div className="space-y-4">
      {value.map((req) => {
        // Determine account info
        const account = req.account;
        const accountName = isSimpleUser(account)
          ? account.login
          : account.name;
        const accountAvatar = account.avatar_url;
        const AccountIcon = isSimpleUser(account)
          ? LucideReact.User
          : LucideReact.Building;

        // Determine requester info (always simple_user)
        const requester = req.requester;
        const requesterName = requester.login;
        const requesterAvatar = requester.avatar_url;

        // Format creation date
        const formattedDate = new Date(req.created_at).toLocaleString(
          undefined,
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          },
        );

        return (
          <div
            key={req.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            {/* Header with request ID and date */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                Request #{req.id}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                <LucideReact.Calendar size={16} className="mr-1" />
                <time dateTime={req.created_at}>{formattedDate}</time>
              </div>
            </div>

            {/* Details grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Account */}
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <LucideReact.Users size={16} /> Account
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <img
                    src={accountAvatar}
                    alt={accountName}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = avatarFallback(accountName);
                    }}
                  />
                  <div className="flex items-center gap-1 text-gray-900">
                    <AccountIcon size={16} className="text-gray-400" />
                    <span className="truncate">{accountName}</span>
                  </div>
                </dd>
              </div>

              {/* Requester */}
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-1">
                  <LucideReact.User size={16} /> Requester
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <img
                    src={requesterAvatar}
                    alt={requesterName}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = avatarFallback(requesterName);
                    }}
                  />
                  <div className="flex items-center gap-1 text-gray-900">
                    <LucideReact.User size={16} className="text-gray-400" />
                    <span className="truncate">{requesterName}</span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}
