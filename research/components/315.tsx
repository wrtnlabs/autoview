import { tags } from "typia";
import React from "react";
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
        account: any | any;
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
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.integration_installation_request[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No integration installation requests found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((req) => {
        const displayName = req.requester.name?.trim() || req.requester.login;
        const displayEmail = req.requester.email;
        const createdAt = formatDate(req.created_at);

        return (
          <div
            key={req.id}
            className="flex items-start p-4 bg-white rounded-lg shadow-sm"
          >
            <img
              src={req.requester.avatar_url}
              alt={`${displayName} avatar`}
              className="w-12 h-12 rounded-full object-cover mr-4 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-sm text-gray-600 truncate">
                @{req.requester.login}
              </p>
              {displayEmail && (
                <p className="text-sm text-gray-500 truncate">{displayEmail}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{createdAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
