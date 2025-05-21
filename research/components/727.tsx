import { tags } from "typia";
import React from "react";
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
        state: "error" | "failure" | "inactive" | "pending" | "success" | "queued" | "in_progress";
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
        owner: any | any;
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
    export type simple_user = any;
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.deployment_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusStyles: Record<AutoViewInput["state"], string> = {
    error: "bg-red-100 text-red-800",
    failure: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    queued: "bg-blue-100 text-blue-800",
    in_progress: "bg-blue-100 text-blue-800",
  };
  const statusLabels: Record<AutoViewInput["state"], string> = {
    error: "Error",
    failure: "Failure",
    inactive: "Inactive",
    pending: "Pending",
    success: "Success",
    queued: "Queued",
    in_progress: "In Progress",
  };

  const {
    state,
    description,
    environment,
    creator,
    created_at,
    updated_at,
    target_url,
    deployment_url,
    repository_url,
    environment_url,
    log_url,
  } = value;

  const statusClass = statusStyles[state];
  const statusLabel = statusLabels[state];
  const createdDate = new Date(created_at).toLocaleString();
  const updatedDate = new Date(updated_at).toLocaleString();
  const creatorName = creator
    ? creator.name ?? creator.login
    : "Unknown";

  // truncate long URLs for display
  const truncateMiddle = (str: string, start = 15, end = 10): string => {
    if (str.length <= start + end + 3) return str;
    return `${str.slice(0, start)}...${str.slice(str.length - end)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Status & Environment */}
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusClass}`}>
          {statusLabel}
        </span>
        {environment && (
          <span className="text-sm text-gray-500 truncate">{environment}</span>
        )}
      </div>

      {/* Description */}
      {description !== "" && (
        <p className="text-gray-700 text-sm line-clamp-2">
          {description}
        </p>
      )}

      {/* Creator */}
      {creator && (
        <div className="flex items-center space-x-2">
          <img
            src={creator.avatar_url}
            alt={creator.login}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-gray-600 text-sm">{creatorName}</span>
        </div>
      )}

      {/* Dates & URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
        <div>
          <span className="font-medium text-gray-700">Created:</span> {createdDate}
        </div>
        <div>
          <span className="font-medium text-gray-700">Updated:</span> {updatedDate}
        </div>
        {target_url && (
          <div>
            <span className="font-medium text-gray-700">Target URL:</span>{" "}
            <span className="truncate">{truncateMiddle(target_url)}</span>
          </div>
        )}
        {log_url && (
          <div>
            <span className="font-medium text-gray-700">Log URL:</span>{" "}
            <span className="truncate">{truncateMiddle(log_url)}</span>
          </div>
        )}
      </div>

      {/* Deployment & Repo URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
        <div>
          <span className="font-medium text-gray-700">Deployment:</span>{" "}
          <span className="truncate">{truncateMiddle(deployment_url)}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Repository:</span>{" "}
          <span className="truncate">{truncateMiddle(repository_url)}</span>
        </div>
      </div>
    </div>
  );
}
