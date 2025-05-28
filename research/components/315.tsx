import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Request to install an integration on a target
     *
     * @title Integration Installation Request
    */
    export interface integration_installation_request {
        /**
         * Unique identifier of the request installation.
        */
        id: number & tags.Type<"int32">;
        node_id?: string;
        account: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
        requester: AutoViewInputSubTypes.simple_user;
        created_at: string & tags.Format<"date-time">;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.integration_installation_request[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and helpers
  const requests = value;
  const count = requests.length;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Empty state
  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <span className="mt-4 text-lg">No installation requests found.</span>
      </div>
    );
  }

  // 3. List of requests
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        {count} Installation Request{count > 1 ? "s" : ""}
      </h2>
      <div className="space-y-4">
        {requests.map((req) => {
          // Determine account subtype
          const account = req.account;
          const isEnterprise = "slug" in account;
          const accName = isEnterprise
            ? (account as AutoViewInputSubTypes.enterprise).name
            : (account as AutoViewInputSubTypes.simple_user).login;
          const accSubtitle = isEnterprise
            ? (account as AutoViewInputSubTypes.enterprise).description ?? ""
            : (account as AutoViewInputSubTypes.simple_user).name ??
              (account as AutoViewInputSubTypes.simple_user).login;
          const accAvatar = account.avatar_url;
          const accFallback = isEnterprise
            ? `https://placehold.co/80x80/e2e8f0/64748b?text=${encodeURIComponent(
                accName
              )}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                accName
              )}&background=0D8ABC&color=fff`;

          // Requester is always simple_user
          const requester = req.requester;
          const reqName = requester.login;
          const reqDisplayName = requester.name ?? requester.login;
          const reqEmail = requester.email;
          const reqAvatar = requester.avatar_url;
          const reqFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            reqDisplayName
          )}&background=6B7280&color=fff`;

          return (
            <div
              key={req.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LucideReact.DownloadCloud
                    size={20}
                    className="text-indigo-500"
                  />
                  <span className="text-md font-medium text-gray-800">
                    Request #{req.id}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <LucideReact.Calendar size={16} />
                  <span className="ml-1">{formatDate(req.created_at)}</span>
                </div>
              </div>

              {/* Account & Requester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {isEnterprise ? (
                      <LucideReact.Building
                        size={16}
                        className="text-gray-500"
                      />
                    ) : (
                      <LucideReact.User size={16} className="text-gray-500" />
                    )}
                    <span className="text-sm font-semibold text-gray-700">
                      Account
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src={accAvatar}
                      alt={`${accName} avatar`}
                      onError={(e) => {
                        e.currentTarget.src = accFallback;
                      }}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-gray-800 truncate">
                        {accName}
                      </span>
                      {accSubtitle && (
                        <span className="block text-xs text-gray-500 truncate">
                          {accSubtitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Requester */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LucideReact.User size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Requester
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src={reqAvatar}
                      alt={`${reqDisplayName} avatar`}
                      onError={(e) => {
                        e.currentTarget.src = reqFallback;
                      }}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-gray-800 truncate">
                        {reqDisplayName}
                      </span>
                      {reqEmail && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
                          <LucideReact.Mail size={14} />
                          <span>{reqEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
