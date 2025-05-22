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
  const statusMap: Record<AutoViewInput["state"], { text: string; color: string }> = {
    success:    { text: "Success",    color: "bg-green-100 text-green-800" },
    error:      { text: "Error",      color: "bg-red-100 text-red-800" },
    failure:    { text: "Failure",    color: "bg-red-100 text-red-800" },
    inactive:   { text: "Inactive",   color: "bg-gray-100 text-gray-800" },
    pending:    { text: "Pending",    color: "bg-yellow-100 text-yellow-800" },
    queued:     { text: "Queued",     color: "bg-blue-100 text-blue-800" },
    in_progress:{ text: "In Progress",color: "bg-blue-100 text-blue-800" },
  };
  const statusInfo = statusMap[value.state];
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const environment = value.environment && value.environment.length > 0
    ? value.environment
    : "default";
  const description = value.description && value.description.length > 0
    ? value.description
    : "No description provided";
  const creatorLogin = value.creator?.login ?? "Unknown";
  const creatorAvatar = value.creator?.avatar_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 text-sm font-semibold rounded ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
        <span className="text-xs text-gray-500">ID: {value.id}</span>
      </div>
      <div className="mt-4 flex items-center">
        {creatorAvatar ? (
          <img
            className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
            src={creatorAvatar}
            alt={creatorLogin}
          />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
        )}
        <span className="text-sm font-medium text-gray-700">{creatorLogin}</span>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-800">
          Environment: <span className="font-normal">{environment}</span>
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <div>Created: {createdAt}</div>
        <div>Updated: {updatedAt}</div>
        {value.target_url && (
          <div className="truncate">Target URL: {value.target_url}</div>
        )}
      </div>
    </div>
  );
}
